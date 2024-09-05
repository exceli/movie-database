import { App } from '@/app/app'
import '@/shared/config/firebase'
import 'normalize.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

const container = document.querySelector('#root') as HTMLElement
const root = createRoot(container)

root.render(
	<StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</StrictMode>
)
