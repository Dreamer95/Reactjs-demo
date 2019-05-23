import * as types from './../constants/ActionTypes';

var random = () => {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

var genarateId = () => {
    return new Date().getTime() + '-' + random() + random() + '-' + + random() + random();
}

var findIndex = (tasks, id) => {   
    var result = -1;
    tasks.forEach((task, index) => {
      if (task.id === id) {
        result = index;
      }
    })
    return result;
  }

// lay data tu localStorage neu ko co thi truyen mang rong
var data = JSON.parse(localStorage.getItem('newTasks'))
var initialState = data ? data : [];

var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LIST_ALL: return state
        case types.SAVE_TASK:
            var task = {
                id : action.task.id,
                name : action.task.name,
                status : action.task.status
            }
            if (!task.id){
                task.id = genarateId();
                state.push(task);
            }else {
                var index = findIndex(state, task.id);
                state[index] = task;
            }           
            localStorage.setItem('newTasks', JSON.stringify(state))            
            return [...state];
        case types.DELETE_TASK :
            state.splice(findIndex(state, action.task.id), 1);
            localStorage.setItem('newTasks', JSON.stringify(state))
            return [...state];
        case types.UPDATE_STATUS :
            index = findIndex(state, action.id);
            state[index] = {
                ...state[index],
                status : !state[index].status
            } // copy va gan lai gia tri cho object
            
            localStorage.setItem('newTasks', JSON.stringify(state))
            return [...state] // return ve copy array    
        default: return state
    }
}

export default myReducer;