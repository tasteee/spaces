import { produce } from 'immer'
import buildStore from './build'
import kindOf from 'kind-of'

// export type TrackedKeyT = keyof typeof INITIAL_STATE
// type KeyboardStateT = typeof INITIAL_STATE

const INITIAL_STATE = {
	isWindowFocused: true,
	isPaused: false,
	isCapsLocked: false,
	isArrowPressed: false,
	isModifierPressed: false,
	isDigitPressed: false,
	isWASDPressed: false,
	isRotatorPressed: false,

	arrowdown: false,
	arrowup: false,
	arrowleft: false,
	arrowright: false,

	shift: false,
	control: false,
	alt: false,

	digit1: false,
	digit2: false,
	digit3: false,
	digit4: false,
	digit5: false,
	digit6: false,
	digit7: false,
	digit8: false,
	digit9: false,
	digit0: false,

	w: false,
	a: false,
	s: false,
	d: false,
	q: false,
	e: false,

	space: false,
	enter: false,
	backspace: false,
	delete: false,
	tab: false,
	esc: false
}

export const toggleDispatching = (value) => {
	keyboard.set((draft) => {
		const currentValue = draft.isPaused
		const wasValueProvided = kindOf(value) === 'boolean'
		const finalValue = wasValueProvided ? value : !currentValue
		// console.log('setting paused: ', finalValue)
		draft.isPaused = finalValue
	})
}

export const getShortcutStatus = (keysDown) => {
	return keysDown.every((key) => keyboard.state[key])
}

// export type KeyboardActionsT = {
//   getShortcutStatus: (keysDown: TrackedKeyT[]) => boolean
//   toggleDispatching: (value?: boolean) => void
// }

export const keyboard = buildStore({
	id: 'keyboard',
	initialState: INITIAL_STATE,
	actions: {
		getShortcutStatus,
		toggleDispatching
	}
})

const getIsWASDPressed = (state) => {
	const isPressedW = state.w
	const isPressedA = state.a
	const isPressedS = state.s
	const isPressedD = state.d
	return isPressedW || isPressedA || isPressedS || isPressedD
}

const getIsArrowPressed = (state) => {
	const isPressedArrowDown = state.arrowdown
	const isPressedArrowUp = state.arrowup
	const isPressedArrowLeft = state.arrowleft
	const isPressedArrowRight = state.arrowright

	return isPressedArrowDown || isPressedArrowUp || isPressedArrowLeft || isPressedArrowRight
}

const getIsModifierPressed = (state) => {
	const isPressedShift = state.shift
	const isPressedControl = state.control
	const isPressedAlt = state.alt

	return isPressedShift || isPressedControl || isPressedAlt
}

const getIsDigitPressed = (state) => {
	const isPressedDigit1 = state.digit1
	const isPressedDigit2 = state.digit2
	const isPressedDigit3 = state.digit3
	const isPressedDigit4 = state.digit4
	const isPressedDigit5 = state.digit5
	const isPressedDigit6 = state.digit6
	const isPressedDigit7 = state.digit7
	const isPressedDigit8 = state.digit8
	const isPressedDigit9 = state.digit9
	const isPressedDigit0 = state.digit0

	return (
		isPressedDigit1 ||
		isPressedDigit2 ||
		isPressedDigit3 ||
		isPressedDigit4 ||
		isPressedDigit5 ||
		isPressedDigit6 ||
		isPressedDigit7 ||
		isPressedDigit8 ||
		isPressedDigit9 ||
		isPressedDigit0
	)
}

const deriveRotatorPressed = (state) => {
	const isPressedQ = state.q
	const isPressedE = state.e

	return isPressedQ || isPressedE
}

const handleKey = (event, value) => {
	if (event.repeat) return
	if (keyboard.state.isPaused) return
	const key = event.key.toLowerCase()
	const snapshot = { ...keyboard.state, [key]: value }
	const isCapsLocked = event.getModifierState('CapsLock')
	const isWASDPressed = getIsWASDPressed(snapshot)
	const isArrowPressed = getIsArrowPressed(snapshot)
	const isModifierPressed = getIsModifierPressed(snapshot)
	const isDigitPressed = getIsDigitPressed(snapshot)
	const isRotatorPressed = deriveRotatorPressed(snapshot)

	keyboard.set({
		...snapshot,
		isCapsLocked,
		isWASDPressed,
		isArrowPressed,
		isModifierPressed,
		isDigitPressed,
		isRotatorPressed
	})
}

window.addEventListener('keydown', (event) => {
	handleKey(event, true)
})

window.addEventListener('keyup', (event) => {
	handleKey(event, false)
})

window.addEventListener('focus', function () {
	keyboard.set({ isWindowFocused: true })
})

window.addEventListener('blur', function () {
	keyboard.set({ isWindowFocused: false })
})
