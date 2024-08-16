import { App } from 'app/app'
import 'normalize.css'
import { createRoot } from 'react-dom/client'
import 'shared/config/firebase'

const container = document.querySelector('#root') as HTMLElement
const root = createRoot(container)

root.render(
	// <React.StrictMode>
	<App />
	// </React.StrictMode>
)
