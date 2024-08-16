import { doc, getDoc } from 'firebase/firestore'
import api from 'shared/api/axiosConfig'
import { db } from 'shared/config/firebase'
import { Movie } from 'shared/types/types'

export const getMovieDetails = async (movieId: string, userId: string): Promise<Movie> => {
    try {
        const apiInstance = api()
        const response = await apiInstance.get(`/movie/${movieId}`)
        const movie: Movie = response.data

        const movieDocRef = doc(db, 'playlists', userId, 'movies', movieId)
        const movieDoc = await getDoc(movieDocRef)

        if (movieDoc.exists()) {
            movie.isPlaylist = true
        } else {
            movie.isPlaylist = false
        }

        return movie
    } catch (error) {
        console.error('Error fetching movie details: ', error)
        throw error
    }
}
