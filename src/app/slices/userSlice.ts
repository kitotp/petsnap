import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import supabase from "../../supabaseClient";



type UserState = {
    username: string,
    id: string,
    status: 'idle' | 'loading' | 'failed',
    error?: string
}

function loadUser(): UserState {
    const saved = localStorage.getItem('user')
    if (!saved) return { username: '', status: 'idle', id: '0' }
    try {
        return JSON.parse(saved)
    } catch {
        console.warn('failed to parse user from localStorage')
        return { username: '', status: 'idle', id: '0' }
    }
}

type User = {
    id: string,
    email: string
}

const initialState: UserState = loadUser()

type fetchUserByEmailProps = {
    email: string,
    password: string
}

export const fetchUserByEmail = createAsyncThunk<User, fetchUserByEmailProps>(
    'user/fetchByEmail',
    async ({ email, password }) => {

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })
        if (error) throw new Error('Error while signing in')

        if (!data.session || !data.session.user.email) {
            throw new Error('No user mail')
        }

        return {
            id: data.session.user.id,
            email: data.session.user.email
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        addUser(state, action) {
            state.username = action.payload
        },
        logout(state) {
            state.username = '',
                state.status = 'idle'
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserByEmail.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchUserByEmail.fulfilled, (state, action: PayloadAction<User>) => {
                state.status = 'idle',
                    state.username = action.payload.email,
                    state.id = action.payload.id
            })
            .addCase(fetchUserByEmail.rejected, (state, action) => {
                state.status = 'failed',
                    state.error = action.payload ?? action.error.message
            })
    },
})

export default userSlice.reducer
export const { addUser, logout } = userSlice.actions
