import { AppDispatch } from '@/app/store'
import { fetchPlaylistMovies } from '@/entities/playlist/model/playlistSlice'
import { setSearchMovies } from '@/entities/search/model/searchSlice'
import { useAuth } from '@/entities/user/hook/useAuth'
import { addToPlaylist } from '@/shared/api/firebase'
import { useRequest } from '@/shared/hooks/useRequest'
import { Movie } from '@/shared/types/types'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

export const useAddToPlaylist = (movies: Movie[]) => {
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

	return {
		handleAddToPlaylist,
		isAddMovieLoading,
		addMovieError,
		addedMovie,
		addingMovieId,
	}
}
