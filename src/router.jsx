import { Router as Wouter, Route, Switch } from 'wouter'
import styled from '@emotion/styled'
import WorldsView from './app/views/worlds/worlds-view'
import { CssVarsProvider } from '@mui/joy'
import CssBaseline from '@mui/joy/CssBaseline'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { auth, supabase } from './stores'

export default function Router() {
	const isAuthenticated = auth.isAuthenticated.use()
	const RouterComponent = isAuthenticated ? UserRouter : StrangerRouter

	return (
		<CssVarsProvider defaultMode="light">
			<CssBaseline />
			<$Container>
				<RouterComponent />
			</$Container>
		</CssVarsProvider>
	)
}

const UserRouter = () => {
	return (
		<Wouter>
			<Switch>
				<Route path="/">
					<WorldsView />
				</Route>
				<Route path="/play/world/:worldId">
					{/* <World />
					<WorldUI /> */}
				</Route>
			</Switch>
		</Wouter>
	)
}

const StrangerRouter = () => {
	return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
}

const $Container = styled.main`
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	overscroll-behavior: contain;
`
