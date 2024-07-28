import { combineReducers, configureStore } from '@reduxjs/toolkit'
import playlistReducer from 'entities/movie/model/playlistSlice'
import searchReducer from 'entities/movie/model/searchSlice'
import userReducer from 'entities/user/model/slice/userSlice'

const rootReducer = combineReducers({
    search: searchReducer,
    user: userReducer,
    playlist: playlistReducer
})

export const store = configureStore({
    reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch