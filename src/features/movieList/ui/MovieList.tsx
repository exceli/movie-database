import { Card, CardContent, Grid, Typography } from '@mui/material'
import { FC } from 'react'
import { Movie } from 'shared/types'

interface MovieListProps {
	movies: Movie[]
}

export const MovieList: FC<MovieListProps> = ({ movies }) => {
	return (
		<>
			{movies.map(movie => (
				<Grid item xs={12} sm={6} md={4} key={movie.id}>
					<Card>
						<CardContent>
							<Typography variant="h6" component="h2">
								{movie.name}
							</Typography>
							<Typography variant="body2" color="textSecondary">
								{movie.description}
							</Typography>
						</CardContent>
					</Card>
				</Grid>
			))}
		</>
	)
}
