import { App } from '@/app/app'
import '@/shared/config/firebase'
import 'normalize.css'
import { createRoot } from 'react-dom/client'

const container = document.querySelector('#root') as HTMLElement
const root = createRoot(container)

root.render(
	// <React.StrictMode>
	<App />
	// </React.StrictMode>
)
