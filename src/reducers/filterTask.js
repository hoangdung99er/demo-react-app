import * as types from '../constants/ActionTypes';

var initialState = {
    filterName : '',
    filterStatus : -1,
};

var myReducer = (state = initialState , action) => {
    switch(action.type){
        case types.FILTER_TASK :
            // action.filter.filterStatus = +action.filter.filterStatus;
            return {
                filterName : action.filter.filterName,
                filterStatus : +action.filter.filterStatus 
            }

        default: 
            return state;
    }
};

export default myReducer;