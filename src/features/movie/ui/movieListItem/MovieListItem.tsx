import { Movie } from '@/shared/types/types'
import DeleteIcon from '@mui/icons-material/Delete'
import StarIcon from '@mui/icons-material/Star'
import {
	Avatar,
	Box,
	IconButton,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography,
} from '@mui/material'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

interface MovieListItemProps {
	movie: Movie
	onDelete: (movieId: string) => void
}

export const MovieListItem: FC<MovieListItemProps> = ({ movie, onDelete }) => {
	const navigate = useNavigate()

	const handleMovieClick = (movieId: string) => {
		navigate(`/movie/${movieId}`)
	}

	return (
		<ListItem
			key={movie.id}
			alignItems="flex-start"
			button
			onClick={() => handleMovieClick(movie.id)}
		>
			<ListItemAvatar>
				<Avatar
					variant="square"
					src={movie.poster.previewUrl}
					alt={movie.name}
					sx={{ width: 56, height: 56 }}
				/>
			</ListItemAvatar>
			<ListItemText
				primary={
					<Box
						display="flex"
						alignItems="center"
						justifyContent="space-between"
					>
						<Typography variant="h6" component="h2">
							{movie.name}
						</Typography>
						<Box display="flex" alignItems="center">
							<StarIcon style={{ color: 'gold' }} />
							<Typography variant="body2" color="textSecondary">
								{movie.rating.imdb}
							</Typography>
						</Box>
					</Box>
				}
			/>
			<IconButton
				onClick={e => {
					e.stopPropagation()
					onDelete(movie.id.toString())
				}}
			>
				<DeleteIcon />
			</IconButton>
		</ListItem>
	)
}
