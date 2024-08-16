import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getPlaylistMovies as fetchPlaylistMoviesFromAPI } from 'shared/api/firebase'
import { Movie } from 'shared/types/types'
import { removeFromPlaylist } from './api'

interface PlaylistState {
    movies: Movie[]
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null
}

const initialState: PlaylistState = {
    movies: [],
    status: 'idle',
    error: null
}

export const fetchPlaylistMovies = createAsyncThunk(
    'playlist/fetchPlaylistMovies',
    async (userId: string) => {
        const movies = await fetchPlaylistMoviesFromAPI(userId)
        return movies
    }
)

export const deleteMovieFromPlaylist = createAsyncThunk(
    'playlist/deleteMovieFromPlaylist',
    async ({ userId, movieId }: { userId: string; movieId: string }) => {
        await removeFromPlaylist(userId, movieId)
        return movieId
    }
)

const playlistSlice = createSlice({
    name: 'playlist',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPlaylistMovies.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchPlaylistMovies.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.movies = action.payload
            })
            .addCase(fetchPlaylistMovies.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(deleteMovieFromPlaylist.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(deleteMovieFromPlaylist.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.movies = state.movies.filter(
                    (movie) => movie.id.toString() !== action.payload
                )
            })
            .addCase(deleteMovieFromPlaylist.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export default playlistSlice.reducer
