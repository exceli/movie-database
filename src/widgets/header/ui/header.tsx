import { removeUser } from '@/entities/user/model/userSlice'
import {
	AppBar,
	Box,
	Button,
	CircularProgress,
	Container,
	Toolbar,
	Typography,
} from '@mui/material'
import { RootState } from 'app/store'
import { getAuth, signOut } from 'firebase/auth'
import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

export const Header: FC = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { email, id, status } = useSelector((state: RootState) => state.user)

	const handleLogout = async () => {
		const auth = getAuth()
		try {
			await signOut(auth)
			dispatch(removeUser())
			navigate('/login')
		} catch (error) {
			console.error('Failed to sign out: ', error)
		}
	}

	const handleProfileClick = () => {
		navigate(`/profile/${id}`)
	}

	return (
		<AppBar position="static">
			<Container maxWidth="lg">
				<Toolbar>
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1 }}
					>
						<Link
							to="/"
							style={{ textDecoration: 'none', color: 'inherit' }}
						>
							LOGO
						</Link>
					</Typography>

					{status === 'loading' ? (
						<CircularProgress color="inherit" size={24} />
					) : email ? (
						<Box display="flex" alignItems="center">
							<Button
								color="inherit"
								onClick={handleProfileClick}
								sx={{ mr: 2 }}
							>
								{email}
							</Button>
							<Button color="inherit" onClick={handleLogout}>
								Выход
							</Button>
						</Box>
					) : (
						<Button color="inherit" href="/login">
							Вход
						</Button>
					)}
				</Toolbar>
			</Container>
		</AppBar>
	)
}
