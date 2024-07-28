import {
	Avatar,
	Box,
	Button,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Paper,
	Typography,
} from '@mui/material'
import React from 'react'
import { Movie } from 'shared/types'
import { Loading } from 'shared/ui/loading'
import { Rating } from 'shared/ui/rating'

interface ResultsDropdownProps {
	movies: Array<Movie>
	isLoading: boolean
	error: string | null
	onItemClick: (movie: Movie) => void
	userId: string
}

const getOptimizedImageUrl = (url: string, width: number, quality: number) => {
	return `${url}?tr=w-${width},q-${quality}`
}

export const ResultsDropdown: React.FC<ResultsDropdownProps> = ({
	movies,
	isLoading,
	error,
	onItemClick,
}) => {
	const handleAddToPlaylist = (movie: Movie) => {
		onItemClick(movie)
	}

	return (
		<Paper elevation={3}>
			{isLoading && <Loading />}
			{!isLoading && movies.length > 0 && (
				<List>
					{movies.map(movie => (
						<ListItem key={movie.id} button>
							<ListItemAvatar>
								<Avatar
									src={getOptimizedImageUrl(movie?.backdrop?.url, 56, 80)}
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
							<Button
								variant="contained"
								color="primary"
								onClick={() => handleAddToPlaylist(movie)}
							>
								Add to Playlist
							</Button>
						</ListItem>
					))}
				</List>
			)}
			{!isLoading && error && (
				<Typography color="error" mt={2}>
					{error}
				</Typography>
			)}
		</Paper>
	)
}
