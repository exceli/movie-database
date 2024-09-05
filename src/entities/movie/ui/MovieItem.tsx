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
import React from 'react'

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

export const MovieItem: React.FC<MovieItemProps> = ({
	movie,
	error,
	onItemClick,
	addingMovieId,
}) => {
	const user = useAuth()
	const isAddingCurrentMovie = addingMovieId === movie.id

	return (
		<ListItem key={movie.id}>
			<ListItemAvatar>
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
