import StarIcon from '@mui/icons-material/Star'
import {
	Avatar,
	Box,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography,
} from '@mui/material'
import { Movie } from 'entities/movie/types/types'
import { FC } from 'react'

interface MovieListProps {
	movies: Movie[]
}

export const MovieList: FC<MovieListProps> = ({ movies }) => {
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
				</ListItem>
			))}
		</List>
	)
}
