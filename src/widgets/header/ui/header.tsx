import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { RootState } from 'app/store'
import { removeUser } from 'entities/user/model/slice/userSlice'
import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const Header: FC = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const user = useSelector((state: RootState) => state.user)

	const handleLogout = () => {
		dispatch(removeUser())
		navigate('/login')
	}

	return (
		<AppBar position="static">
			<Toolbar>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					<img src="/path/to/logo.png" alt="Logo" style={{ height: '40px' }} />
				</Typography>
				{user.email ? (
					<Box display="flex" alignItems="center">
						<Typography variant="h6" sx={{ mr: 2 }}>
							{user.email}
						</Typography>
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
