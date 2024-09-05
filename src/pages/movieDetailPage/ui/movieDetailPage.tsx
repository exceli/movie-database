import { RootState } from '@/app/store'
import { getMovieDetails } from '@/entities/movie/api/api'
import { useAddToPlaylist } from '@/entities/playlist/hooks/useAddToPlaylist'
import { useAuth } from '@/entities/user/hook/useAuth'
import { setMovie, updateMovie } from '@/features/movie/model/movieSlice'
import { Button } from '@/shared/ui/button'
import { Loading } from '@/shared/ui/loading'
import StarIcon from '@mui/icons-material/Star'
import { Avatar, Box, Container, Typography } from '@mui/material'
import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

export const MovieDetailPage: FC = () => {
	const { movieId } = useParams()
	const user = useAuth()
	const dispatch = useDispatch()
	const movie = useSelector(
		(state: RootState) => state.movie.movies[movieId!]
	)

	const { handleAddToPlaylist, addMovieError, addingMovieId } =
		useAddToPlaylist([movie])

	useEffect(() => {
		const fetchMovie = async () => {
			try {
				const response = await getMovieDetails(movieId, user.id)
				dispatch(setMovie(response))
			} catch (err) {
				console.error('Error fetching movie details:', err)
			}
		}

		if (movieId && user?.id && !movie) {
			fetchMovie()
		}
	}, [movieId, user, dispatch, movie])

	const isAddingCurrentMovie = addingMovieId === movie?.id

	const handleAddMovie = async () => {
		if (movie) {
			await handleAddToPlaylist(movie)
			dispatch(updateMovie({ ...movie, isPlaylist: true }))
		}
	}

	return (
		<Container maxWidth="md">
			<Box mt={4}>
				<Box display={'flex'}>
					<Avatar
						variant="square"
						src={movie?.poster.url}
						alt={movie?.name}
						sx={{
							width: 222,
							height: 333,
							marginRight: 4,
							marginBottom: 4,
						}}
					/>
					<Box>
						<Typography variant="h4" component="h1">
							{movie?.name} ({movie?.year}){' '}
							{movie?.isPlaylist ? (
								'(in playlist)'
							) : isAddingCurrentMovie ? (
								<Loading />
							) : (
								<Button
									variant="contained"
									color="primary"
									onClick={handleAddMovie}
									disabled={isAddingCurrentMovie || !user}
								>
									+
								</Button>
							)}
						</Typography>
						<Box display="flex" alignItems="center">
							<StarIcon style={{ color: 'gold' }} />
							<Typography
								variant="h6"
								color="textSecondary"
								ml={1}
							>
								{movie?.rating.imdb}
							</Typography>
						</Box>
					</Box>
				</Box>
			</Box>
			<Typography variant="h6" component="h2" gutterBottom>
				Description
			</Typography>
			<Typography variant="body1">{movie?.description}</Typography>

			{addMovieError && (
				<Typography color="error" mt={2}>
					{addMovieError}
				</Typography>
			)}
		</Container>
	)
}
