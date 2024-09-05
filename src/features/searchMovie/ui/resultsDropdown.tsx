import { AppDispatch } from '@/app/store'
import { MovieItem } from '@/entities/movie/ui/MovieItem'
import { fetchPlaylistMovies } from '@/entities/playlist/model/playlistSlice'
import { setSearchMovies } from '@/entities/search/model/searchSlice'
import { useAuth } from '@/entities/user/hook/useAuth'
import { addToPlaylist } from '@/shared/api/firebase'
import { useRequest } from '@/shared/hooks/useRequest'
import { Movie } from '@/shared/types/types'
import { Loading } from '@/shared/ui/loading'
import { List, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

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
	const dispatch = useDispatch<AppDispatch>()
	const user = useAuth()
	const [addingMovieId, setAddingMovieId] = useState<string | null>(null)

	const {
		executeRequest: addMovieToPlaylist,
		isLoading: isAddMovieLoading,
		error: addMovieError,
		data: addedMovie,
	} = useRequest(async (userId: string, movie: Movie) => {
		await addToPlaylist(userId, movie)
		dispatch(fetchPlaylistMovies(user.id))
		return movie
	})

	const handleAddToPlaylist = async (movie: Movie) => {
		if (user && user.id) {
			setAddingMovieId(movie.id)
			try {
				const updatedMovie = await addMovieToPlaylist(user.id, {
					...movie,
					isPlaylist: true,
				})

				dispatch(
					setSearchMovies(
						movies.map(movie =>
							movie.id === updatedMovie.id
								? { ...movie, isPlaylist: true }
								: movie
						)
					)
				)
			} catch (error) {
				console.error(error)
			} finally {
				setAddingMovieId(null)
			}
		}
	}

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
