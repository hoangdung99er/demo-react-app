import * as types from '../constants/ActionTypes';

var initialState = {
    sortName : 'name',
    sortValue : 1,
};

var myReducer = (state = initialState , action) => {
    switch(action.type){
        case types.SORT :
            // console.log(action);
            return action.sort;

        default: 
            return state;
    }
};

export default myReducer;