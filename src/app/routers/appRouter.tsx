import { HomePage } from 'pages/homePage'
import { LoginPage } from 'pages/loginPage'
import { SignUpPage } from 'pages/signUpPage'
import { FC } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Header } from 'widgets/header'

export const AppRouter: FC = () => {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/sign-up" element={<SignUpPage />} />
			</Routes>
		</Router>
	)
}
