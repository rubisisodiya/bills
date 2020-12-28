const expenditureTypeReducer = (state = [], action) => {
    switch(action.type) {
        case 'EXPENDITURE_TYPE_LIST': {
            return [...action.payload]
        }
        case 'ADD_EXPENDITURE_TYPE': {
            return [...state, action.payload]
        }
        default: {
            return state
        }
    }
}

export default expenditureTypeReducer