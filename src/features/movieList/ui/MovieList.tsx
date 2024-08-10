import DeleteIcon from '@mui/icons-material/Delete'
import StarIcon from '@mui/icons-material/Star'
import {
	Avatar,
	Box,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography,
} from '@mui/material'
import { FC } from 'react'
import { Movie } from 'shared/types/types'

interface MovieListProps {
	movies: Movie[]
	onDelete: (movieId: string) => void
}

export const MovieList: FC<MovieListProps> = ({ movies, onDelete }) => {
	return (
		<List>
			{movies.map(movie => (
				<ListItem key={movie.id} alignItems="flex-start">
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
					<IconButton onClick={() => onDelete(movie.id)}>
						<DeleteIcon />
					</IconButton>
				</ListItem>
			))}
		</List>
	)
}
