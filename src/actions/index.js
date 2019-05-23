import * as types from './../constants/ActionTypes';

export const listAll = () => {
    return {
        type: types.LIST_ALL
    }
}

export const saveTask = (task) => {
    return {
        type: types.SAVE_TASK,
        task: task
    }
}

export const toggleForm = () => {
    return {
        type: types.TOGGLE_FORM
    }
}

export const openForm = () => {
    return {
        type: types.OPEN_FORM
    }
}

export const closeForm = () => {
    return {
        type: types.CLOSE_FORM
    }
}

export const editTask = (task) => {
    return {
        type: types.EDIT_TASK,
        task: task
    }
}

export const deleteTask = (task) => {
    return {
        type: types.DELETE_TASK,
        task: task
    }
}

export const updateStatus = (id) => {
    return {
        type: types.UPDATE_STATUS,
        id: id
    }
}

export const filterTable = (filter) =>{
    return {
        type : types.FILTER_TABLE,
        filter : filter
    }
}

export const searchTable = (keyword) => {
    return {
        type : types.SEARCH_TABLE,
        keyword
    }
}

export const sortTable = (sort) => {
    return {
        type : types.SORT_TABLE,
        sort
    }
}