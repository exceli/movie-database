import { useAuth } from '@/entities/user/hook/useAuth' // TODO fix this
import { Movie } from '@/shared/types/types'
import { Button } from '@/shared/ui/button'
import { Loading } from '@/shared/ui/loading'
import { Rating } from '@/shared/ui/rating'
import CheckIcon from '@mui/icons-material/Check'
import {
	Avatar,
	Box,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography,
} from '@mui/material'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

interface MovieItemProps {
	movie: Movie
	isLoading: boolean
	error: string | null
	addedMovie: Movie | null
	onItemClick: (movie: Movie) => void
	addingMovieId: string | null
}

const getOptimizedImageUrl = (url: string, width: number, quality: number) => {
	return `${url}?tr=w-${width},q-${quality}`
}

export const MovieItem: FC<MovieItemProps> = ({
	movie,
	error,
	onItemClick,
	addingMovieId,
}) => {
	const navigate = useNavigate()
	const user = useAuth()
	const isAddingCurrentMovie = addingMovieId === movie.id

	const handleMovieClick = (movieId: string) => {
		navigate(`/movie/${movieId}`)
	}

	return (
		<ListItem key={movie.id}>
			<ListItemAvatar
				onClick={() => handleMovieClick(movie.id)}
				sx={{ cursor: 'pointer' }}
			>
				<Avatar
					src={getOptimizedImageUrl(
						movie?.poster?.previewUrl,
						56,
						80
					)}
					alt={movie?.name}
					sx={{ width: 56, height: 56, mr: 2 }}
				/>
			</ListItemAvatar>
			<ListItemText
				onClick={() => handleMovieClick(movie.id)}
				sx={{ cursor: 'pointer' }}
				primary={movie.name}
				secondary={
					<Box component="span">
						<Typography component="span">{movie.year}</Typography>
						<Rating rating={movie.rating.imdb} />
					</Box>
				}
			/>
			{user.id &&
				(movie.isPlaylist ? (
					<CheckIcon color="success" />
				) : isAddingCurrentMovie ? (
					<Loading />
				) : (
					<Button
						variant="contained"
						color="primary"
						onClick={() => onItemClick(movie)}
					>
						+
					</Button>
				))}

			{error && !isAddingCurrentMovie && (
				<Typography color="error" mt={2}>
					{error}
				</Typography>
			)}
		</ListItem>
	)
}
