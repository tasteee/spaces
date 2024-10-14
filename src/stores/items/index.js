import build from '../build'

class DashStore {
	ownedWorlds = []
	recentWorlds = []
}

class SettingsStore {
	username = ''
}

class WorldStore {
	items = {}
	selectedItemIds = []
	blocks = []

	get itemIds() {
		return Object.keys(this.items)
	}
}

class World {
	items = []
	timeOfDay = 0
}
