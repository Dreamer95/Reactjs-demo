import {combineReducers} from 'redux';
import tasks from './tasks';
import isDisplayForm from './isDisplayForm';
import itemEditting from './itemEditting';
import filterTable from './filterTable';
import searchTable from './searchTable';
import sortTable from './sortTable';

const myReducer = combineReducers({
    tasks : tasks,
    isDisplayForm : isDisplayForm,
    itemEditting : itemEditting,
    filterTable : filterTable,
    searchTable : searchTable,
    sortTable : sortTable
})

export default myReducer;