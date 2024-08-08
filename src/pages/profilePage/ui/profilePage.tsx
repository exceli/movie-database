import { Box, Container, Grid, Typography } from '@mui/material'
import { AppDispatch, RootState } from 'app/store'
import { fetchPlaylistMovies } from 'entities/movie/model/playlistSlice'
import { MovieList } from 'features/movieList/ui/MovieList'
import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from 'shared/hooks/useAuth'
import { colors } from 'shared/ui/colors/colors'
import { Loading } from 'shared/ui/loading'

export const ProfilePage: FC = () => {
	const dispatch = useDispatch<AppDispatch>()
	const user = useAuth()
	const { movies, status } = useSelector((state: RootState) => state.playlist)

	useEffect(() => {
		if (user && user.id) {
			dispatch(fetchPlaylistMovies(user.id))
		}
	}, [user, dispatch])

	return (
		<Box
			sx={{
				backgroundColor: colors.pageBackground,
				minHeight: 'calc(100vh - 64px)',
				color: colors.textPrimary,
			}}
		>
			<Container
				maxWidth="md"
				sx={{
					backgroundColor: colors.backgroundLight,
					padding: 4,
					borderRadius: 2,
				}}
			>
				<Box mt={4} mb={4}>
					<Typography variant="h4" component="h1" gutterBottom>
						{user.email}'s Profile
					</Typography>
					<Typography variant="h6" component="h2" gutterBottom>
						Your Added Movies
					</Typography>
					<Grid container spacing={2}>
						{status === 'loading' ? <Loading /> : <MovieList movies={movies} />}
					</Grid>
				</Box>
			</Container>
		</Box>
	)
}
