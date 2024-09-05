import { db } from '@/shared/config/firebase'
import { Movie } from '@/shared/types/types'
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'

export const removeFromPlaylist = async (userId: string, movieId: string): Promise<void> => {
    try {
        const movieRef = doc(db, 'playlists', userId, 'movies', movieId)
        await deleteDoc(movieRef)
    } catch (e) {
        console.error('Error removing document: ', e)
        throw e
    }
}

export const getPlaylistMovies = async (userId: string): Promise<Movie[]> => {
    const movies: Movie[] = []
    try {
        const querySnapshot = await getDocs(collection(db, 'playlists', userId, 'movies'))
        querySnapshot.forEach((doc) => {
            movies.push(doc.data() as Movie)
        })
    } catch (e) {
        console.error('Error fetching playlist movies: ', e)
    }
    return movies
}
