const categoryReducer = (state = [], action) => {
    switch(action.type) {
        case 'CATEGORY_LIST': {
            return [...action.payload]
        }
        default: {
            return state
        }
    }
}

export default categoryReducer