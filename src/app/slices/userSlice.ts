import { createSlice } from "@reduxjs/toolkit";

type initialStateType = {
    username: string
} 

const initialState: initialStateType = {
    username: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        addUser(state, action){
            state.username = action.payload
        }
    }
})

export default userSlice.reducer
export const {addUser} = userSlice.actions

