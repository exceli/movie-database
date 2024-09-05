import { Movie } from '@/shared/types/types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface SearchState {
    movies: Movie[] | null
}

const initialState: SearchState = {
    movies: null
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchMovies: (state, action: PayloadAction<Movie[]>) => {
            state.movies = action.payload
        },
    },
})

export const { setSearchMovies } = searchSlice.actions
export default searchSlice.reducer