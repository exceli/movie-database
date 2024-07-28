import { addDoc, collection, getDocs } from "firebase/firestore"
import { db } from 'shared/config/firebase'
import { Movie } from 'shared/types'

export const addToPlaylist = async (userId: string, movie: Movie) => {
    try {
        if (!userId || !movie || !movie.id || !movie.name) {
            throw new Error('Invalid data')
        }

        const docRef = await addDoc(collection(db, 'playlists', userId, 'movies'), {
            id: movie.id,
            name: movie.name,
            year: movie.year,
            rating: movie.rating.imdb,
            backdrop: movie.backdrop.url
        })

        console.log('Document written with ID: ', docRef.id)
    } catch (e) {
        console.error('Error adding document: ', e)
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
