import { Movie } from '@/shared/types/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface MovieState {
	movies: Record<string, Movie>
}

const initialState: MovieState = {
	movies: {},
}

const movieSlice = createSlice({
	name: 'movie',
	initialState,
	reducers: {
		setMovie(state, action: PayloadAction<Movie>) {
			state.movies[action.payload.id] = action.payload
		},
		updateMovie(state, action: PayloadAction<Movie>) {
			state.movies[action.payload.id] = {
				...state.movies[action.payload.id],
				...action.payload,
			}
		},
	},
})

export const { setMovie, updateMovie } = movieSlice.actions

export default movieSlice.reducer
