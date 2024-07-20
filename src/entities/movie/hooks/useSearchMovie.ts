import { AppDispatch } from 'app/store'
import { setMovies } from 'entities/movie/model/searchSlice'
import { useDispatch } from 'react-redux'
import api from 'shared/api/axiosConfig'
import { useRequest } from 'shared/hooks/useRequest'

interface UseSearchMoviesResult {
    searchMovies: (query: string, page?: number, limit?: number) => Promise<void>
    isLoading: boolean
    error: string | null
}

export const useSearchMovies = (): UseSearchMoviesResult => {
    const dispatch: AppDispatch = useDispatch()

    const apiCallback = async (query: string, page: number = 1, limit: number = 10) => {
        const apiInstance = api()
        const response = await apiInstance.get('/movie/search', {
            params: { query, page, limit },
        })
        dispatch(setMovies(response.data.docs))

        return response.data.docs
    }

    const { executeRequest: searchMovies, isLoading, error } = useRequest(apiCallback)

    return { searchMovies, isLoading, error }
}
