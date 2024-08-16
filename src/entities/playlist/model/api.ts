import { deleteDoc, doc } from 'firebase/firestore'
import { db } from 'shared/config/firebase'

export const removeFromPlaylist = async (userId: string, movieId: string): Promise<void> => {
    try {
        const movieRef = doc(db, 'playlists', userId, 'movies', movieId)
        await deleteDoc(movieRef)
    } catch (e) {
        console.error('Error removing document: ', e)
        throw e
    }
}
