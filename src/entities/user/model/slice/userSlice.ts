import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

interface UserState {
    id: string | null
    email: string | null
    token: string | null
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null
}

const initialState: UserState = {
    id: null,
    email: null,
    token: null,
    status: 'idle',
    error: null,
}

export const fetchUser = createAsyncThunk<
    { id: string; email: string; token: string },
    void
>('user/fetchUser', async () => {
    const auth = getAuth()

    return new Promise<{ id: string; email: string; token: string }>((resolve, reject) => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const token = await user.getIdToken()
                resolve({ id: user.uid, email: user.email!, token })
            } else {
                reject('No user signed in')
            }
        })
    })
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ id: string; email: string; token: string }>) => {
            state.id = action.payload.id
            state.email = action.payload.email
            state.token = action.payload.token
        },
        removeUser: (state) => {
            state.id = null
            state.email = null
            state.token = null
        },
        logout: (state) => {
            state.id = null
            state.email = null
            state.token = null
            state.status = 'idle'
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.id = action.payload.id
                state.email = action.payload.email
                state.token = action.payload.token
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message || 'Failed to fetch user'
            })
    },
})

export const { setUser, removeUser, logout } = userSlice.actions

export default userSlice.reducer
