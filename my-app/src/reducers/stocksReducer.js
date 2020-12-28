const stockReducer = (state = [], action) => {
    switch(action.type) {
        case 'STOCKS_LIST': {
            return [...action.payload]
        }
        case 'REMOVE_STOCK': {
            return state.filter(stock => stock._id !== action.payload._id)
        }
        case "PURCHASE_STOCK_UPDATE": {
            return state.map(stock => {
                if(stock._id === action.payload._id){
                    return Object.assign({}, stock, action.payload)
                }
                else{
                    return Object.assign({}, stock)
                }
            })
        }
        case "UPDATE_STOCK": {
            return state.map(stock => {
                if(stock._id === action.payload._id){
                    return Object.assign({}, stock, action.payload)
                }
                else{
                    return Object.assign({}, stock)
                }
            })
        }
        default: {
            return state
        }
    }
}

export default stockReducer