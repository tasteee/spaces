import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

const createHostConfig = () => {
	const host = process.env.TAURI_DEV_HOST

	if (!host) {
		return {
			host: false,
			hmr: undefined
		}
	}

	return {
		host,
		hmr: {
			protocol: 'ws',
			host,
			port: 1421
		}
	}
}

const createServerConfig = () => {
	const hostConfig = createHostConfig()

	return {
		port: 1420,
		strictPort: true,
		...hostConfig,
		watch: {
			ignored: ['**/src-tauri/**']
		}
	}
}

const createPluginsConfig = () => {
	return [react(), tsconfigPaths()]
}

export default defineConfig(async () => ({
	clearScreen: false,
	plugins: createPluginsConfig(),
	server: createServerConfig(),
	resolve: {
		alias: {
			app: '/src/app',
			game: '/src/games',
			stores: '/src/stores',
			shared: '/src/shared'
		}
	}
}))
