const billReducer = (state = [], action) => {
    switch(action.type) {
        case 'BILLS_LIST': {
            return [...action.payload]
        }
        case 'ADD_BILL': {
            return [action.payload].concat(state)
        }
        default: {
            return state
        }
    }
}

export default billReducer