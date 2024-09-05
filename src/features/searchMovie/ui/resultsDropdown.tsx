import { MovieItem } from '@/entities/movie/ui/MovieItem'
import { useAddToPlaylist } from '@/entities/playlist/hooks/useAddToPlaylist'
import { Movie } from '@/shared/types/types'
import { Loading } from '@/shared/ui/loading'
import { List, Paper, Typography } from '@mui/material'
import React from 'react'

interface ResultsDropdownProps {
	movies: Movie[]
	isLoading: boolean
	error: string | null
}

export const ResultsDropdown: React.FC<ResultsDropdownProps> = ({
	movies,
	isLoading,
	error,
}) => {
	const {
		handleAddToPlaylist,
		isAddMovieLoading,
		addMovieError,
		addedMovie,
		addingMovieId,
	} = useAddToPlaylist(movies)

	return (
		<Paper elevation={3}>
			{isLoading && <Loading />}
			{!isLoading && movies.length > 0 && (
				<List>
					{movies.map(movie => (
						<MovieItem
							key={movie.id}
							movie={movie}
							isLoading={isAddMovieLoading}
							error={addMovieError}
							addedMovie={addedMovie}
							onItemClick={handleAddToPlaylist}
							addingMovieId={addingMovieId}
						/>
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
