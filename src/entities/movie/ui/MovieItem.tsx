import CheckIcon from '@mui/icons-material/Check'
import {
	Avatar,
	Box,
	CircularProgress,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography,
} from '@mui/material'
import { Movie } from 'entities/movie/types/types'
import React from 'react'
import { Button } from 'shared/ui/button'
import { Rating } from 'shared/ui/rating'

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
	isLoading,
	error,
	addedMovie,
	onItemClick,
	addingMovieId,
}) => {
	const isAddingCurrentMovie = addingMovieId === movie.id
	const isAdded = addedMovie?.id === movie.id

	return (
		<ListItem key={movie.id}>
			<ListItemAvatar>
				<Avatar
					src={getOptimizedImageUrl(movie?.poster?.previewUrl, 56, 80)}
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
			{isAddingCurrentMovie ? (
				isLoading ? (
					<CircularProgress size={24} />
				) : isAdded ? (
					<CheckIcon color="success" />
				) : (
					<Button
						variant="contained"
						color="primary"
						onClick={() => onItemClick(movie)}
					>
						Try Again
					</Button>
				)
			) : (
				<Button
					variant="contained"
					color="primary"
					onClick={() => onItemClick(movie)}
				>
					Add to Playlist
				</Button>
			)}
			{error && !isAddingCurrentMovie && (
				<Typography color="error" mt={2}>
					{error}
				</Typography>
			)}
		</ListItem>
	)
}
