import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice'

const store = configureStore({
    reducer: {
        user: userReducer
    }
})

store.subscribe(() => {
    const state = store.getState()
    localStorage.setItem('user', JSON.stringify(state.user))
})

export default store

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;