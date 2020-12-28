const customersReducer = (state = [], action ) => {
    switch(action.type){
        case 'CUSTOMERS_LIST': {
            return state = action.payload
        }
        case 'ADD_CUSTOMER': {
            return state.concat(action.payload)
        }
        case 'REMOVE_CUSTOMER': {
            return state.filter(cus => cus._id !== action.payload)
        }
        case 'UPDATE_CUSTOMER': {
            return state.map(cus => {
                if(cus._id === action.payload._id){
                    return Object.assign({},cus,action.payload)
                }else{
                    return Object.assign({},cus)
                }
            })
        }
        default: {
            return [...state]
        }
    }
}

export default customersReducer