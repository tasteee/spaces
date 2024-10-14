import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './router'

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)

root.render(
	<React.StrictMode>
		<Router />
	</React.StrictMode>,
)
