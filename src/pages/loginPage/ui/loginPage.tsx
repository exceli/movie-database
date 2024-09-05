import { setUser } from '@/entities/user/model/userSlice'
import { Button } from '@/shared/ui/button'
import { Form } from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'
import { Box, Container, Typography } from '@mui/material'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

export const LoginPage: FC = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const auth = getAuth()

		try {
			const { user } = await signInWithEmailAndPassword(
				auth,
				email,
				password
			)
			const token = await user.getIdToken()

			dispatch(
				setUser({
					id: user.uid,
					email: user.email,
					token: token,
				})
			)
			navigate('/')
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<Container maxWidth="sm">
			<Box
				display="flex"
				flexDirection="column"
				alignItems="center"
				justifyContent="center"
				height="100vh"
			>
				<Typography variant="h4" component="h1" gutterBottom>
					Login
				</Typography>
				<Form onSubmit={handleLogin}>
					<Input
						label="Email"
						variant="outlined"
						margin="normal"
						required
						fullWidth
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
					<Input
						label="Password"
						variant="outlined"
						margin="normal"
						type="password"
						required
						fullWidth
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						fullWidth
						sx={{ mt: 2 }}
					>
						Login
					</Button>
				</Form>
				<Box mt={2}>
					<Link to="/">Home</Link>
					<Link to="/sign-up">Sign Up</Link>
				</Box>
			</Box>
		</Container>
	)
}
