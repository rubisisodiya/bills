const dealersReducer = (state = [], action ) => {
    switch(action.type){
        case 'DEALERS_LIST': {
            return state = action.payload
        }
        case 'ADD_DEALER': {
            return state.concat(action.payload)
        }
        case 'REMOVE_DEALER': {
            return state.filter(deal => deal._id !== action.payload)
        }
        case 'UPDATE_DEALER': {
            return state.map(deal => {
                if(deal._id === action.payload._id){
                    return Object.assign({},deal,action.payload)
                }else{
                    return Object.assign({},deal)
                }
            })
        }
        default: {
            return [...state]
        }
    }
}

export default dealersReducer