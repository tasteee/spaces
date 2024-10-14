import React from 'react'
import { useThree } from '@react-three/fiber'
import { Clouds, Cloud, PointLight, SpotLight, useHelper } from '@react-three/drei'
import * as THREE from 'three'

const FOG = new THREE.FogExp2(0xffffff, 0.05)

const useFog = () => {
	const { scene } = useThree()

	React.useEffect(() => {
		if (!scene) return
		scene.fog = FOG
	}, [scene])
}

export default function Lights() {
	const pointLightRef = React.useRef()
	const spotLightRef = React.useRef()
	useFog()

	useHelper(pointLightRef, THREE.PointLightHelper, 0.5, 'hotpink')
	useHelper(spotLightRef, THREE.SpotLightHelper, 'teal')

	return (
		<>
			<ambientLight intensity={0.2} color="#ffe9d1" />

			<PointLight ref={pointLightRef} position={[0, 5, 0]} intensity={0.8} color="#ffd9aa" distance={15} decay={2} />

			<SpotLight
				ref={spotLightRef}
				position={[-5, 8, -5]}
				angle={Math.PI / 6}
				penumbra={0.5}
				intensity={0.8}
				color="#ff9e5e"
				distance={20}
				decay={2}
				target-position={[0, 0, 0]}
			/>

			<hemisphereLight skyColor="#b1e1ff" groundColor="#ff9e5e" intensity={0.3} />

			<Clouds material={THREE.MeshBasicMaterial}>
				<Cloud segments={40} bounds={[10, 2, 2]} volume={10} color="orange" />
				<Cloud seed={1} scale={2} volume={5} color="hotpink" fade={100} />
			</Clouds>
		</>
	)
}
