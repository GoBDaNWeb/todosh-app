import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    showTeamList: false,
}

const teamSlice = createSlice({
    name: 'team',
    initialState,
    reducers: {
        toggleShowTeamList(state) {
            state.showTeamList = !state.showTeamList
        },
        closeTeamList(state) {
            state.showTeamList = false
        },
    }
})

export const {toggleShowTeamList, closeTeamList} = teamSlice.actions

export default teamSlice.reducer