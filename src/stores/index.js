import global from './global'
import { supabase, auth, data } from './base'

global.stores.set('supabase', supabase)
global.stores.set('auth', auth)
global.stores.set('data', data)

export { supabase, auth, data, global }

// // Authentication
// await base.auth.authenticate({ username: 'user@example.com', password: 'password123' })
// console.log(base.auth.isAuthenticated)
// await base.auth.deauthenticate()

// // Data operations
// const newWorld = await base.data.worlds.create({ worldName: 'My World', userId: 'user123' })
// const world = await base.data.worlds.get(newWorld.id)
// await base.data.worlds.update({ worldId: newWorld.id, name: 'Updated World Name' })
