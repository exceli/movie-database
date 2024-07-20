import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState = {
    movies: null
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setMovies: (state, action: PayloadAction) => {
            state.movies = action.payload
        },
    },
})

export const { setMovies } = searchSlice.actions
export default searchSlice.reducer