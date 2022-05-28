import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    user: null,
    status: null,
    error: null,
    session: null,
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError(state) {
            state.error = null
        },
        setUser(state, action) {
            state.user = action.payload
        },
        setSession(state, action) {
            state.session = action.payload
        },

    }
})

export const {clearError, setUser, setSession} = authSlice.actions

export default authSlice.reducer