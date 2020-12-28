const productReducer = (state = [], action) => {
    switch(action.type) {
        case 'PRODUCTS_LIST': {
            return [...action.payload]
        }
        case 'ADD_PRODUCT':
            return [...state,action.payload]
        case 'UPDATE_PRODUCT':
            // console.log(action.payload.id)
            return state.map(product => {
                // console.log(product,action.payload)
                if (product._id === action.payload.id) {
                    return {...product, ...action.payload.product}
                } else {
                    return {...product}
                }
            })
        case 'REMOVE_PRODUCT': 
            return state.filter(product => product._id !== action.payload)
        default: {
            return state
        }
    }
}
export default productReducer