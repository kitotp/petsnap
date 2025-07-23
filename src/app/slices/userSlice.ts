import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import supabase from "../../supabaseClient";
import type { User } from "../../types";


type UserState = {
    username: string,
    id: string,
    role: string,
    status: 'idle' | 'loading' | 'failed',
    error?: string
}

function loadUser(): UserState {
    const saved = localStorage.getItem('user')
    if (!saved) return { username: '', status: 'idle', id: '0', role: '' }
    try {
        return JSON.parse(saved)
    } catch {
        console.warn('failed to parse user from localStorage')
        return { username: '', status: 'idle', id: '0', role: '' }
    }
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

        const user_id = data.session!.user.id

        const { data: profile, error: loginError } = await supabase
            .from('user_profiles')
            .select('email, role')
            .eq('id', user_id)
            .single()

        if (loginError) throw loginError

        return {
            id: user_id,
            email: profile?.email,
            role: profile?.role
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
            state.id = ''
            state.role = ''
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
                    state.id = action.payload.id,
                    state.role = action.payload.role
            })
            .addCase(fetchUserByEmail.rejected, (state) => {
                state.status = 'failed'
            })
    },
})

export default userSlice.reducer
export const { addUser, logout } = userSlice.actions
