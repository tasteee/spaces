import React from 'react'
import { useThree } from '@react-three/fiber'
import { Instances, Instance } from '@react-three/drei'
import memoize from 'just-memoize'

// type PropsT = {
//   color: string
//   width: number
//   height: number
// }

const createInstances = memoize((width, height) => {
	const instances = []

	for (let x = 0; x < width; x++) {
		for (let z = 0; z < height; z++) {
			instances.push(<Instance key={`${x}-${z}`} position={[x, -0.5, z]} />)
		}
	}

	return instances
})

export const LowerLimit = (props) => {
	return (
		<Instances limit={props.width * props.height}>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color={props.color} />
			{createInstances(props.width, props.height)}
		</Instances>
	)
}

export default LowerLimit
