import { Box, Container, Grid, Typography } from '@mui/material'
import { AppDispatch, RootState } from 'app/store'
import { fetchPlaylistMovies } from 'entities/playlist/model/playlistSlice'
import { useAuth } from 'entities/user/hook/useAuth'
import { MovieList } from 'features/movieList/ui/MovieList'
import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Loading } from 'shared/ui/loading'

export const ProfilePage: FC = () => {
	const dispatch = useDispatch<AppDispatch>()
	const user = useAuth()
	const { movies, status, error } = useSelector(
		(state: RootState) => state.playlist
	)

	useEffect(() => {
		if (user && user.id) {
			dispatch(fetchPlaylistMovies(user.id))
		}
	}, [user, dispatch])

	const handleDeleteMovie = (movieId: string) => {
		console.log(movieId)
	}

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
				<Box mt={4} mb={4}>
					<Typography variant="h4" component="h1" gutterBottom>
						{user.email}'s Profile
					</Typography>
					<Typography variant="h6" component="h2" gutterBottom>
						Ваши добавленные фильмы
					</Typography>
					<Grid container spacing={2}>
						{status === 'loading' ? (
							<Loading />
						) : status === 'failed' ? (
							<Typography color="error">{error}</Typography>
						) : (
							<MovieList movies={movies} onDelete={handleDeleteMovie} />
						)}
					</Grid>
				</Box>
			</Container>
		</Box>
	)
}
