import { useThree } from '@react-three/fiber'
import { useMainLoop } from '@manapotion/react'
import compose from 'just-compose'
import $context from 'stores/context.store'

const useAdvance = () => useThree((s) => s.advance)
const getThrottle = (fps) => 1000 / fps

// type LoopContextT = {
//   time: number
//   delta: number
//   deltaWithThrottle: number
//   elapsedRunning: number
//   callbackCount: number
// }

// type MainLoopPropsT = {
//   fps?: number
// }

const useLoopOptions = (props) => {
	return useMemo(() => {
		return { throttle: getThrottle(props.fps) }
	}, [props.fps])
}

export const MainLoop = (props) => {
	const advance = useAdvance()
	const loopOptions = useLoopOptions(props)

	function runChecks(context) {
		context.hasBeenChecked = true
		return context
	}

	function complete(context) {
		advance(context.time / 1000)
	}

	const handleFrame = (context) => {
		if (!$context.isWindowFocused) return null
		const mutableContext = { ...context }
		return compose(runChecks, complete)(mutableContext)
	}

	useMainLoop(handleFrame, loopOptions)
	return null
}
