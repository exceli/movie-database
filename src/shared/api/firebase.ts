import { db } from '@/shared/config/firebase'
import { doc, setDoc } from "firebase/firestore"
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

