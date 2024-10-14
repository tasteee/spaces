import { useGLTF } from '@react-three/drei'

export const useModel = (modelId) => {
	const { scene } = useGLTF(`/models/${modelId}.gltf`)
	return scene.children[0]
}
