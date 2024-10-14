import { renderHook, act } from '@testing-library/react-hooks'
import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest'
import { buildStore } from '../build'
import global from '../global'

// // Mock zustand
// vi.mock('zustand', () => ({
// 	create: vi.fn((initializer) => {
// 		let state = initializer()
// 		const listeners = new Set()

// 		const setState = (partial, replace) => {
// 			const nextState = typeof partial === 'function' ? partial(state) : partial
// 			state = replace ? nextState : { ...state, ...nextState }
// 			listeners.forEach((listener) => listener(state))
// 		}

// 		const getState = () => state

// 		const subscribe = (listener) => {
// 			listeners.add(listener)
// 			return () => listeners.delete(listener)
// 		}

// 		return Object.assign(
// 			vi.fn((selector = (s) => s) => selector(state)),
// 			{
// 				setState,
// 				getState,
// 				subscribe
// 			}
// 		)
// 	})
// }))

// // Mock immer
// vi.mock('immer', () => ({
// 	produce: vi.fn((base, recipe) => {
// 		const draft = { ...base }
// 		recipe(draft)
// 		return draft
// 	})
// }))

describe('buildStore', () => {
	const initialState = {
		user: { name: 'John', age: 30 },
		settings: { theme: 'light' }
	}

	const actions = {
		incrementAge: (draft) => {
			draft.user.age += 1
		},

		setAge: (draft, age) => {
			draft.userage = age
		},

		toggleTheme: (draft) => {
			const isLight = draft.settings.theme === 'light'
			draft.settings.theme = isLight ? 'dark' : 'light'
		}
	}

	const store = buildStore({
		id: 'testStore',
		initialState,
		actions
	})

	afterEach(() => {
		vi.clearAllMocks()
	})

	test('store is created with initial state', () => {
		expect(store.state).toEqual(initialState)
	})

	test('store is added to global.stores', () => {
		expect(global.stores.get('testStore')).toBe(store)
	})

	test('store exposes actions', () => {
		expect(store.incrementAge).toBeDefined()
		expect(store.toggleTheme).toBeDefined()
		expect(typeof store.incrementAge).toBe('function')
		expect(typeof store.toggleTheme).toBe('function')
	})

	describe('store.use', () => {
		test('returns entire state when called without selector', () => {
			const { result } = renderHook(() => store.use())
			expect(result.current).toEqual(initialState)
		})

		test('returns selected state when called with selector', () => {
			const { result } = renderHook(() => store.use((state) => state.user.name))
			expect(result.current).toBe(initialState.user.name)
		})
	})

	describe('store.[key].use', () => {
		test('returns entire key state when called without selector', () => {
			const { result } = renderHook(() => store.user.use())
			expect(result.current).toEqual(initialState.user)
		})

		test('returns selected key state when called with selector', () => {
			const { result } = renderHook(() => store.user.use((user) => user.name))
			expect(result.current).toBe(initialState.user.name)
		})
	})

	describe('store.set', () => {
		test('updates entire state with object', () => {
			act(() => {
				store.set({ user: { name: 'Jane', age: 25 } })
			})
			expect(store.state.user).toEqual({ name: 'Jane', age: 25 })
		})

		test('updates entire state with function', () => {
			act(() => {
				store.set((draft) => {
					draft.user.name = 'Jane'
				})
			})
			expect(store.state.user.name).toBe('Jane')
		})
	})

	describe('store.[key].set', () => {
		test('updates key state with value', () => {
			act(() => {
				store.user.set({ name: 'Jane', age: 25 })
			})
			expect(store.state.user).toEqual({ name: 'Jane', age: 25 })
		})

		test('updates key state with function', () => {
			act(() => {
				store.user.set((draft) => {
					draft.name = 'Jane'
				})
			})
			expect(store.state.user.name).toBe('Jane')
		})
	})

	describe('store.[key].state', () => {
		test('returns current state for the key', () => {
			expect(store.user.state).toEqual(initialState.user)
			act(() => {
				store.user.set({ name: 'Jane' })
			})

			expect(store.user.state).toEqual({ name: 'Jane', age: 30 })
		})
	})

	describe('actions', () => {
		test('incrementAge action works correctly', () => {
			act(() => {
				store.incrementAge()
			})
			expect(store.state.user.age).toBe(31)
		})

		test('toggleTheme action works correctly', () => {
			act(() => {
				store.toggleTheme()
			})

			expect(store.state.settings.theme).toBe('dark')

			act(() => {
				store.toggleTheme()
			})
			expect(store.state.settings.theme).toBe('light')
		})
	})
})
