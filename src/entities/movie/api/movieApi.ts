import api from 'shared/api/axiosConfig'

export const searchMovies = async (query: string, page: number = 1, limit: number = 10) => {
    try {
        const apiInstance = api()
        const response = await apiInstance.get('/movie/search', {
            params: {
                query,
                page,
                limit,
            },
        })
        return response.data
    } catch (error) {
        console.error('Error searching movies:', error)
        throw error
    }
}
