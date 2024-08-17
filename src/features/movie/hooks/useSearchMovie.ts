import { setSearchMovies } from '@/entities/search/model/searchSlice'
import { useAuth } from '@/entities/user/hook/useAuth'
import api from '@/shared/api/axiosConfig'
import { getPlaylistMovies } from '@/shared/api/firebase'
import { useRequest } from '@/shared/hooks/useRequest'
import { Movie } from '@/shared/types/types'
import { useDispatch } from 'react-redux'

interface UseSearchMoviesResult {
    searchMovies: (query: string, page?: number, limit?: number) => Promise<void>
    isLoading: boolean
    error: string | null
}

export const useSearchMovies = (): UseSearchMoviesResult => {
    const dispatch = useDispatch()
    const user = useAuth()

    const apiCallback = async (query: string, page: number = 1, limit: number = 10): Promise<void> => {
        const apiInstance = api()
        const response = await apiInstance.get('/movie/search', {
            params: { query, page, limit },
        })

        let movies: Movie[] = response.data.docs

        if (user && user.id) {
            const playlistMovies = await getPlaylistMovies(user.id)
            const playlistMovieIds = new Set(playlistMovies.map(movie => movie.id))

            movies = movies.map(movie =>
                playlistMovieIds.has(movie.id)
                    ? { ...movie, isPlaylist: true }
                    : movie
            )
        }

        dispatch(setSearchMovies(movies))
    }

    const { executeRequest: searchMovies, isLoading, error } = useRequest(apiCallback)

    return { searchMovies, isLoading, error }
}

