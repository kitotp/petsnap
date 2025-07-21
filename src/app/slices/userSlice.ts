import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import supabase from "../../supabaseClient";



type UserState = {
    username: string,
    status: 'idle' | 'loading' | 'failed',
    error?: string
}

const initialState: UserState = {
    username: '',
    status: 'idle'
}

type fetchUserByEmailProps = {
    email: string,
    password: string
}

export const fetchUserByEmail = createAsyncThunk<string, fetchUserByEmailProps>(
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

        return data.session.user.email
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        addUser(state, action) {
            state.username = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserByEmail.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchUserByEmail.fulfilled, (state, action: PayloadAction<string>) => {
                state.status = 'idle',
                    state.username = action.payload
            })
            .addCase(fetchUserByEmail.rejected, (state, action) => {
                state.status = 'failed',
                    state.error = action.payload ?? action.error.message
            })
    },
})

export default userSlice.reducer
export const { addUser } = userSlice.actions
