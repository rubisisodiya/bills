const expenseReducer = (state = [], action) => {
    switch(action.type) {
        case 'EXPENSES_LIST': {
            return [...action.payload]
        }
        case 'ADD_EXPENSE': {
            return [...state, action.payload]
        }
        default: {
            return state
        }
    }
}

export default expenseReducer