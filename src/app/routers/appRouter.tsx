import { HomePage } from 'pages/homePage'
import { FC } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

export const AppRouter: FC = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<HomePage />} />
			</Routes>
		</Router>
	)
}
