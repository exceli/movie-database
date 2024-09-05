import playlistReducer from '@/entities/playlist/model/playlistSlice'
import searchModalReducer from '@/entities/search/model/modalSlice'
import searchReducer from '@/entities/search/model/searchSlice'
import userReducer from '@/entities/user/model/userSlice'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
    search: searchReducer,
    searchModal: searchModalReducer,
    user: userReducer,
    playlist: playlistReducer
})

export const store = configureStore({
    reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch