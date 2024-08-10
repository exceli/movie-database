import { addDoc, collection, getDocs } from "firebase/firestore"
import { db } from 'shared/config/firebase'
import { Movie } from 'shared/types/types'

export const addToPlaylist = async (userId: string, movie: Movie): Promise<Movie> => {
    try {
        if (!userId || !movie || !movie.id || !movie.name) {
            throw new Error('Invalid data')
        }

        await addDoc(collection(db, 'playlists', userId, 'movies'), movie)

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
