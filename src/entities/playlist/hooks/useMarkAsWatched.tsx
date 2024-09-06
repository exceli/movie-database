import { AppDispatch } from '@/app/store'
import { useAuth } from '@/entities/user/hook/useAuth'
import { useRequest } from '@/shared/hooks/useRequest'
import { Movie } from '@/shared/types/types'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { markAsWatched } from '../api/api'
import { setMovies } from '../model/playlistSlice'

export const useMarkAsWatched = (movies: Movie[]) => {
	const dispatch = useDispatch<AppDispatch>()
	const user = useAuth()
	const [markingMovieId, setMarkingMovieId] = useState<string | null>(null)

	const {
		executeRequest: markMovieAsWatched,
		isLoading,
		error: markMovieError,
		data: markedMovie,
	} = useRequest(
		async (userId: string, movieId: string, isWatched: boolean) => {
			await markAsWatched(userId, movieId, isWatched)
			return { movieId, isWatched }
		}
	)

	const handleMarkAsWatched = async (movie: Movie) => {
		if (user && user.id) {
			const movieId = movie.id.toString()
			setMarkingMovieId(movieId)
			try {
				const isWatched =
					movie.isWatched !== undefined ? !movie.isWatched : true
				await markMovieAsWatched(user.id, movieId, isWatched)

				const updatedMovies = movies.map(m =>
					m.id === movie.id ? { ...m, isWatched } : m
				)

				dispatch(setMovies(updatedMovies))
			} catch (error) {
				console.error(error)
			} finally {
				setMarkingMovieId(null)
			}
		}
	}

	return {
		handleMarkAsWatched,
		isMarkMovieLoading: isLoading && markingMovieId !== null,
		markMovieError,
		markedMovie,
		markingMovieId,
	}
}
