import * as types from './../constants/ActionTypes';

var s4 = ()  => {
    return Math.random().toString(36).substring(7);
}

var generateID = () => {
    return s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4();
}

var findIndex = (tasks , id) => {
    var result = -1;
    tasks.forEach((task , index) => {
        if(task.id === id)
        {
            result = index
        }
    });
    return result;
}

var data = JSON.parse(localStorage.getItem('tasks'));

var initialState = data ? data : [];

var myReducer = (state = initialState , action) => {
    switch(action.type){
        
        case types.LIST_ALL:
            return state;
        
        case types.ADD_TASK:
            var task = {
                id : action.task.id,
                name : action.task.name,
                status : action.task.status,
            }
            if(!task.id)
            {
                task.id = generateID();
                state.push(task);
                
            }else{

                var index = findIndex(state , task.id);

                state[index]  = task;
                           
            }
            
            localStorage.setItem('tasks', JSON.stringify(state));
            
            return [...state];
        
        case types.DELETE_TASK:
            
            var id = action.id;
            
            var index3 = findIndex(state , id);
            
            if(index3 !== -1){
                state.splice(index3 , 1);
            }
            
            localStorage.setItem('tasks', JSON.stringify(state));
            
            return [...state];

        case types.UPDATE_TASK:

            var id2 = action.id;     

            var index2 = findIndex(state , id2);

            var cloneTask = {...state[index2]};
            
            cloneTask.status = !cloneTask.status;
            
            state[index2] = cloneTask;

            localStorage.setItem('tasks' , JSON.stringify(state));

            return [...state];

        default:
            
            return state;
    }
};

export default myReducer;