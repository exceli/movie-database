import { HomePage } from 'pages/homePage'
import { LoginPage } from 'pages/loginPage'
import { MovieDetailPage } from 'pages/movieDetailPage'
import { ProfilePage } from 'pages/profilePage'
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
				<Route path="/profile/:user" element={<ProfilePage />} />
				<Route path="/movie/:movieId" element={<MovieDetailPage />} />
			</Routes>
		</Router>
	)
}
