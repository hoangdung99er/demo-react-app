import { combineReducers } from 'redux';
import tasks from './tasks';
import isActive from './isActive';
import editTask from './editTask';
import filterTask from './filterTask';
import searchTask from './searchTask';
import sortTask from './sortTask';

const myReducer = combineReducers({
    tasks,
    isActive,
    editTask,
    filterTask,
    searchTask,
    sortTask,
});

export default myReducer;