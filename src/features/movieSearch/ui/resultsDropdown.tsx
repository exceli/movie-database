import {
	Avatar,
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

interface ResultsDropdownProps {
	movies: Array<Movie>
	isLoading: boolean
	error: string | null
	onItemClick: (movieId: string) => void
}

export const ResultsDropdown: React.FC<ResultsDropdownProps> = ({
	movies,
	isLoading,
	error,
	onItemClick,
}) => {
	return (
		<Paper elevation={3}>
			{isLoading && <Loading />}
			{!isLoading && movies.length > 0 && (
				<List>
					{movies.map(movie => (
						<ListItem
							button
							key={movie.id}
							onClick={() => onItemClick(movie.id)}
						>
							<ListItemAvatar>
								<Avatar src={movie.posterUrl} alt={movie.name} />
							</ListItemAvatar>
							<ListItemText primary={movie.name} secondary={movie.year} />
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
