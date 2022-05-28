import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    showDeleteModal: false,
    showProjectList: false,
    todos: []
}

const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        toggleShowDeleteModal(state) {
            state.showDeleteModal = !state.showDeleteModal
        },
        toggleShowProjectList(state) {
            state.showProjectList = !state.showProjectList
        },
        closeProjectList(state) {
            state.showProjectList = false
        },
    }
})

export const {toggleShowDeleteModal, toggleShowProjectList, closeProjectList} = tableSlice.actions

export default tableSlice.reducer