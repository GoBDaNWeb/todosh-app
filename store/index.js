import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice'
import tableReducer from './tableSlice'
import teamReducer from './teamSlice'

export default configureStore({
    reducer: {
        auth: authReducer,
        table: tableReducer,
        team: teamReducer,
    }
})