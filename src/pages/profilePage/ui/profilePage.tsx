import { AppDispatch } from '@/app/store'
import { fetchPlaylistMovies } from '@/entities/playlist/model/playlistSlice'
import { openModal } from '@/entities/search/model/modalSlice'
import { useAuth } from '@/entities/user/hook/useAuth'
import { Button } from '@/shared/ui/button'
import { MovieList } from '@/widgets/movieList'
import { Box, Container, Typography } from '@mui/material'
import { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'

export const ProfilePage: FC = () => {
	const dispatch = useDispatch<AppDispatch>()
	const user = useAuth()

	const handleOpenSearchModal = () => {
		dispatch(openModal())
	}

	useEffect(() => {
		if (user && user.id) {
			dispatch(fetchPlaylistMovies(user.id))
		}
	}, [user, dispatch])

	return (
		<Box
			sx={{
				minHeight: 'calc(100vh - 64px)',
			}}
		>
			<Container
				maxWidth="lg"
				sx={{
					padding: 4,
					borderRadius: 2,
				}}
			>
				<Box display="flex" justifyContent="flex-end">
					<Button variant="contained" onClick={handleOpenSearchModal}>
						+ Add movie
					</Button>
				</Box>
				<Box mt={4} mb={4}>
					<Typography variant="h4" component="h1" gutterBottom>
						{user.email}'s Profile
					</Typography>
					<Typography variant="h6" component="h2" gutterBottom>
						Ваши добавленные фильмы
					</Typography>
					<MovieList />
				</Box>
			</Container>
		</Box>
	)
}
