import { App } from 'app/app'
import React from 'react'
import { createRoot } from 'react-dom/client'

const container = document.querySelector('#root') as HTMLElement
const root = createRoot(container)

root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)
