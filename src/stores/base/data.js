import { supabase } from './setup'

const _worlds = supabase.from('worlds')
const _worldVisits = supabase.from('world_visits')
const _items = supabase.from('items')

const getDateIsoString = () => new Date().toISOString()

const worlds = {
	async update(options) {
		const { worldId, ...updates } = options
		const { data, error } = await _worlds.update(updates).eq('id', worldId)
		return { data: data[0], error }
	},

	async getAllWorldsByOwner(ownerId) {
		const { data, error } = await supabase
			.from('worlds')
			.select(`*, users:owner_id ( username )`)
			.order('created_at', { ascending: false })
			.match({ owner_id: ownerId })

		if (Array.isArray(data)) {
			for (const world of data) {
				world.owner_username = world.users.username
				world.users = undefined
			}
		}

		console.log('getAllWorldsByOwner', { data, error })
		return { data, error }
	},

	async getRecentlyVisitedWorlds(userId, limit = 20) {
		const { data, error } = await supabase
			.from('world_visits')
			.select(`visited_at, worlds:world_id (id,name,color,description,thumbnail_url,time_of_day,owner:owner_id(username))`)
			.eq('user_id', userId)
			.order('visited_at', { ascending: false })
			.limit(limit)

		if (error) console.error('Error fetching recently visited worlds:', error)

		console.log('getRecentlyVisitedWorlds data', data)
		// Reshape the data to flatten the structure
		const formattedData = data.map((visit) => {
			return {
				visited_at: visit.visited_at,
				...visit.worlds,
				owner_username: visit.worlds.owner.username
			}
		})

		console.log('getRecentlyVisitedWorlds', { formattedData })
		return { data: formattedData, error: null }
	},

	// Get recently visited worlds for a user
	async __getRecentlyVisitedWorlds(userId) {
		const { data, error } = await _worldVisits
			.select('world_id')
			.eq('user_id', userId)
			.order('visited_at', { ascending: false })
			.limit(20)

		if (error) return { data: null, error }
		const worldIds = data.map((visit) => visit.world_id)
		return this.getAllWorldsByOwner({ id: worldIds })
	},

	async getWorldsWithIds(worldIds) {
		const { data, error } = await supabase.from('worlds').select('*').in('id', worldIds)
		console.log('getWorldsWithIds', { worldIds, data })
		return { data, error }
	},

	async reportWorldVisit(userId, worldId) {
		const visitedAt = getDateIsoString()
		const upsertData = { user_id: userId, world_id: worldId, visited_at: visitedAt }
		const conflictUpdate = { visited_at: visitedAt }
		const conflictData = { onConflict: 'user_id,world_id', update: conflictUpdate }
		const { data, error } = await _worldVisits.upsert(upsertData, conflictData).select()
		console.log('reportWorldVisit', { data, error })
		return { data: data[0], error }
	}
}

const items = {
	async create(options) {},
	async update(options) {},
	async clone(options) {}
}

export default {
	worlds,
	items
}
