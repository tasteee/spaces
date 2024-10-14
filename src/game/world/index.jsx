import * as THREE from 'three'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { ThreeEvent, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, Select, Outlines } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { motion } from 'framer-motion-3d'
import { DragControls } from '@react-three/drei'
import { observer, useObserver } from 'mobx-react-lite'

const handleClick = (item: WorldItemT, event: ThreeEvent<MouseEvent>) => {
  const count = world.getSelectionCount()
  const isSelected = world.items[item.id].isSelected
  const areOthersSelected = isSelected ? count > 1 : count > 0
  const isShiftPressed = event.shiftKey

  const conditions = [
    !isSelected && !areOthersSelected && !isShiftPressed,
    !isSelected && !areOthersSelected && isShiftPressed,
    !isSelected && areOthersSelected && !isShiftPressed,
    !isSelected && areOthersSelected && isShiftPressed,
    isSelected && !areOthersSelected && !isShiftPressed,
    isSelected && !areOthersSelected && isShiftPressed,
    isSelected && areOthersSelected && !isShiftPressed,
    isSelected && areOthersSelected && isShiftPressed,
  ]

  const selectExclusively = () => {
    world.clearSelection()
    world.selectItem(item.id)
  }

  const handlers = [
    selectExclusively,
    selectExclusively,
    selectExclusively,
    () => world.selectItem(item.id),
    () => world.deselectItem(item.id),
    () => world.deselectItem(item.id),
    () => world.deselectItem(item.id),
    () => world.deselectItem(item.id),
  ]

  console.log(conditions.indexOf(true))
  const handler = handlers[conditions.indexOf(true)]
  handler()
}

// color: '#ffcb30',
// emissive: '#ffcb30',
const selectedMaterial = new THREE.MeshStandardMaterial({
  color: '#c905ff',
  emissive: '#2bffff',
  opacity: 0.7,
  emissiveIntensity: 5,
})

const DRAG_MATRIX = new THREE.Matrix4()

const TRANSITION = {
  opacity: { duration: 1 },
  scale: { duration: 0.5 },
  x: { type: 'spring', damping: 20, stiffness: 100 },
  y: { type: 'spring', damping: 20, stiffness: 100 },
  z: { type: 'spring', damping: 20, stiffness: 100 },
  rotateX: { type: 'spring', damping: 20, stiffness: 100 },
  rotateY: { type: 'spring', damping: 20, stiffness: 100 },
  rotateZ: { type: 'spring', damping: 20, stiffness: 100 },
}

// const [controls, gl, raycaster] = useThree((state) => [state.controls, state.gl, state.raycaster])
export const WorldItem = (props) => {
  const item = world.items[props.id]
  const itemRef = useRef(null)
  const model = useLocalGltf(item.modelId)

  const toggleSelection = (event) => {
    if (world.isDragging) return
    event.stopPropagation()
    if (world.items[item.id].isSelected) world.deselectItem(item.id)
    else world.selectItem(item.id)
    // handleClick(item, event)
  }

  const animate = {
    opacity: 1,
    scale: 1,
    x: item.position[0],
    y: item.position[1],
    z: item.position[2],
    rotateX: item.rotation[0],
    rotateY: item.rotation[1],
    rotateZ: item.rotation[2],
  }

  return (
    <DragControls matrix={DRAG_MATRIX} dragLimits={[undefined, [0, 0], undefined]} autoTransform>
      <motion.group ref={itemRef} onClick={toggleSelection} castShadow receiveShadow animate={animate} transition={transition}>
        <RigidBody type="fixed" colliders="cuboid" restitution={0.2} friction={0.2}>
          <group>
            <mesh
              key={model.uuid}
              geometry={model.geometry}
              material={model.material}
              position={model.position}
              rotation={model.rotation}
              scale={model.scale}
              castShadow
              receiveShadow
            >
              {item.isSelected && <primitive object={selectedMaterial} emissive="#2bffff" emissiveIntensity={2} />}
            </mesh>
          </group>
        </RigidBody>
      </motion.group>
    </DragControls>
  )
})

// const Outliner = (props) => {
//   worldItems.selectedIds.use()

//   return (
//     <>
//       {props.visible && props.model.children[0].geometry && (
//         <>
//           <Outlines visible={props.visible} thickness={1} opacity={0.13} color={0xffffff} angle={0.01} />
//           <Outlines visible={props.visible} thickness={2} opacity={0.82} color={0xff0088} angle={0.05} />
//         </>
//       )}
//     </>
//   )
// }

useGLTF.preload('/gltf/3d-glasses.gltf')
useGLTF.preload('/gltf/3d-printer.gltf')
useGLTF.preload('/gltf/acoustic-foam-panel.gltf')
useGLTF.preload('/gltf/ai-npm.gltf')
useGLTF.preload('/gltf/aircraft-door.gltf')
useGLTF.preload('/gltf/angel.gltf')
