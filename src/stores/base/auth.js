import { supabase } from './setup'
import build from '../build'
import data from './data'

const store = build({
	initialState: {
		userId: null,
		session: null,
		emailAddress: null,
		isAuthenticated: false
	},

	actions: {
		async signIn(options) {
			const { user, error } = await supabase.auth.signIn(options)
			console.log({ user, error })
			return { user, error }
		},

		async signOut() {
			const { error } = await supabase.auth.signOut()
			console.log({ error })
			return { error }
		},

		async handleSession(session) {
			if (store.state.isAuthenticated) return

			console.log('session started', session)
			const emailAddress = session.user.email

			store.set((draft) => {
				draft.isAuthenticated = !!session
				draft.session = session
				draft.emailAddress = session?.user?.email
			})

			const user = await supabase.from('users').select('id').eq('email', emailAddress).single()

			store.set((draft) => {
				draft.userId = user.data?.id
			})
		},

		handleSessionEnd() {
			if (!store.state.isAuthenticated) return

			console.log('session ended')
			store.set((draft) => {
				draft.isAuthenticated = false
				draft.session = null
				draft.emailAddress = null
				draft.userId = null
			})
		}
	}
})

export default store

supabase.auth.getSession().then((result) => {
	console.log('get session', result.data.session)
	result.data.session ? store.handleSession(result.data.session) : store.handleSessionEnd()
})

// supabase.auth.onAuthStateChange(async (event) => {
// 	console.log('on auth state change', event)
// 	if (event === 'SIGNED_IN') {
// 		console.log('entered signed in')
// 		navigate('/home')
// 	}
// })
