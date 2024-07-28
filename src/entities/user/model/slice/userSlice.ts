import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    id: localStorage.getItem('user_id'),
    email: localStorage.getItem('user_email'),
    token: localStorage.getItem('user_token'),
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.id = action.payload.id
            state.email = action.payload.email
            state.token = action.payload.token
            localStorage.setItem('user_id', action.payload.id)
            localStorage.setItem('user_email', action.payload.email)
            localStorage.setItem('user_token', action.payload.token)
        },
        removeUser: (state) => {
            state.id = null
            state.email = null
            state.token = null
            localStorage.removeItem('user_id')
            localStorage.removeItem('user_email')
            localStorage.removeItem('user_token')
        }
    }
})

export const { setUser, removeUser } = userSlice.actions
export default userSlice.reducer