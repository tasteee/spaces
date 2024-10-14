import buildStore from '../../../stores/build'
import wretch from 'wretch'
import { auth, supabase } from 'stores'
import { data } from '../../../stores'
import { useEffect } from 'react'

const store = buildStore({
	id: 'worlds-view',

	initialState: {
		userWorlds: [],
		recentWorlds: [],
		trendingWorlds: [],
		focusedIndex: 0,
		activeTab: 'userWorlds',
		isLoading: true
	},

	actions: {
		getCorrectedFocusedIndex(modifier) {
			const activeTab = store.state.activeTab
			const activeTabWorldList = store.state[activeTab]
			const listLength = activeTabWorldList.length
			const currentFocusedIndex = store.state.focusedIndex
			const newIndex = (currentFocusedIndex + modifier) % listLength
			return newIndex
		},

		incrementFocusedIndex() {
			const newIndex = store.getCorrectedFocusedIndex(1)
			console.log('-- newIndex', newIndex)
			store.focusedIndex.set(newIndex)
		},

		decrementFocusedIndex() {
			const newIndex = store.getCorrectedFocusedIndex(-1)
			console.log('++ newIndex', newIndex)
			store.focusedIndex.set(newIndex)
		},

		useActiveTabWorldsList() {
			console.log('userworlds', store.state.userWorlds)
			return store.use((state) => state[state.activeTab])
		},

		setActiveTab(tab) {
			store.set((draft) => {
				draft.activeTab = tab
				draft.focusedIndex = 0
			})
		},

		async hydrateWorldsLists() {
			const userId = auth.state.userId
			const worlds = await data.worlds.getAllWorldsByOwner(userId)

			store.set((draft) => {
				draft.userWorlds = worlds.data
			})
		},

		useHydrator() {
			const userId = auth.userId.use()

			useEffect(() => {
				userId && store.hydrateWorldsLists()
			}, [userId])
		}
	}
})

export default store
