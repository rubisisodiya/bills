const employeesReducer = ( state = [], action) => {
    switch(action.type){
        case 'EMPLOYEES_LIST': {
            return state = action.payload
        }
        case 'ADD_EMPLOYEE': {
            return state.concat(action.payload)
        }
        case 'REMOVE_EMPLOYEE': {
            return state.filter(emp => emp._id !== action.payload)
        }
        default: {
            return [...state]
        }
    }
}

export default employeesReducer