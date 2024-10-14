import { create } from 'zustand'
import { produce } from 'immer'

function defineGetter(target, key, getter) {
	Object.defineProperty(target, key, {
		get: () => getter()
	})
}

export default function buildStore(options) {
	const stateKeys = Object.keys(options.initialState)
	const actionKeys = Object.keys(options.actions)
	const useStore = create(() => options.initialState)
	const store = { ...options.actions }

	for (const key of stateKeys) {
		store[key] = {}

		const use = (selector) => {
			return useStore((state) => {
				return selector ? selector(state[key]) : state[key]
			})
		}

		const set = (value) => {
			useStore.setState((state) => {
				return {
					...state,
					[key]: value
				}
			})
		}

		store[key] = { use, set }
		defineGetter(store[key], 'state', () => useStore.getState()[key])
	}

	store.set = (input) => {
		const isInputFunction = typeof input === 'function'

		useStore.setState((state) => {
			return isInputFunction ? produce(state, input) : { ...state, ...input }
		})
	}

	store.use = (selector) => {
		return selector ? useStore(selector) : useStore()
	}

	defineGetter(store, 'state', () => useStore.getState())
	return store
}
