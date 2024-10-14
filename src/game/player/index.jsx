import { useModel } from '../tools/useModel'

export default function Player() {
	const model = useModel('default-player-0')

	return (
		<mesh name="player" material={model.material} geometry={model.geometry}>
			<meshStandardMaterial />
		</mesh>
	)
}

console.log({ player: <Player foo="bar" id={123} key="yolo" /> })
