import { db } from '@/shared/config/firebase'
import { collection, doc, getDocs, setDoc } from "firebase/firestore"
import { Movie } from '../types/types'

export const addToPlaylist = async (userId: string, movie: Movie): Promise<Movie> => {
    try {
        const movieIdString = String(movie.id)

        await setDoc(doc(db, 'playlists', userId, 'movies', movieIdString), movie)

        return { ...movie, isPlaylist: true }
    } catch (e) {
        console.error('Error adding document: ', e)
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
