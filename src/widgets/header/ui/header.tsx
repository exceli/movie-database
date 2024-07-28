import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { RootState } from 'app/store'
import { removeUser } from 'entities/user/model/slice/userSlice'
import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

export const Header: FC = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const user = useSelector((state: RootState) => state.user)

	const handleLogout = () => {
		dispatch(removeUser())
		navigate('/login')
	}

	const handleProfileClick = () => {
		navigate(`/profile/${user.id}`)
	}

	return (
		<AppBar position="static">
			<Toolbar>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					<Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
						LOGO
					</Link>
				</Typography>
				{user.email ? (
					<Box display="flex" alignItems="center">
						<Button color="inherit" onClick={handleProfileClick} sx={{ mr: 2 }}>
							{user.email}
						</Button>
						<Button color="inherit" onClick={handleLogout}>
							Logout
						</Button>
					</Box>
				) : (
					<Button color="inherit" href="/login">
						Login
					</Button>
				)}
			</Toolbar>
		</AppBar>
	)
}
