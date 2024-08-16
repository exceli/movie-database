import StarIcon from '@mui/icons-material/Star'
import { Avatar, Box, Typography } from '@mui/material'
import { getMovieDetails } from 'entities/movie/api/api'
import { useAuth } from 'entities/user/hook/useAuth'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Movie } from 'shared/types/types'

export const MovieDetailPage = () => {
	const { movieId } = useParams()
	const user = useAuth()
	const [movie, setMovie] = useState<Movie>(null)

	useEffect(() => {
		const fetchMovie = async () => {
			try {
				const response = await getMovieDetails(movieId, user.id)
				setMovie(response)
			} catch (err) {
				console.error('Error fetching movie details:', err)
			}
		}

		if (movieId && user?.id) {
			fetchMovie()
		}
	}, [movieId, user])

	return (
		<Box sx={{ padding: 4 }}>
			<Box display="flex" alignItems="center" mb={4}>
				<Avatar
					variant="square"
					src={movie?.poster.url}
					alt={movie?.name}
					sx={{ width: 222, height: 333, marginRight: 4 }}
				/>
				<Box>
					<Typography variant="h4" component="h1">
						{movie?.name} ({movie?.year}){' '}
						{movie?.isPlaylist && '(in playlist)'}
					</Typography>
					<Box display="flex" alignItems="center">
						<StarIcon style={{ color: 'gold' }} />
						<Typography variant="h6" color="textSecondary" ml={1}>
							{movie?.rating.imdb}
						</Typography>
					</Box>
				</Box>
			</Box>
			<Typography variant="h6" component="h2" gutterBottom>
				Description
			</Typography>
			<Typography variant="body1">{movie?.description}</Typography>
		</Box>
	)
}
