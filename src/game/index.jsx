import { Canvas } from '@react-three/fiber'
import LowerLimit from './lower-limit'
import * as THREE from 'three'

const setup = (state) => {
	// THREE.ColorManagement.enabled = true
	window.three = state
	$context.camera = state.camera
	$context.scene = state.scene
	state.camera.position.set(20, 20, 20)
	state.camera.rotation.order = 'YXZ'
	state.camera.zoom = 8
	state.camera.rotation.y = -Math.PI / 4
	state.camera.rotation.x = Math.atan(-1 / Math.sqrt(2))
	state.camera.lookAt(0, 0, 0)
	state.camera.updateProjectionMatrix()
}

export default function Game() {
	return (
		<Canvas frameloop="never" onCreated={setup}>
			<MainLoop fps={20} />
			<LowerLimit width={24} height={24} color="#fbe983" />
			<Lights />
			<Player />
			<World />
		</Canvas>
	)
}
