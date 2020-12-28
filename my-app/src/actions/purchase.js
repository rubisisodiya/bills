import axios from '../config/axios'
import Swal from 'sweetalert2'
import { startListProducts } from './product'
//import { getStocksList, UpdateStockQtyPurchase } from './stock'

const getPurchase = (purchases) => {
    return {
        type: 'PURCHASES_LIST', payload: purchases
    }
}
const addPurchase=(purchase)=>{
    return {
        type: "ADD_PURCHASE", payload: purchase
    }
}

const updateStockFromPurchase = (purchase) => {
    return {
        type: "PURCHASE_STOCK_UPDATE", payload: purchase 
    }
}

export const getPurchasesList = () => {
    return (dispatch) => {
        axios.get('/purchases')
            .then(response => {
                // console.log(response)
                if (response.data) {
                    dispatch(getPurchase(response.data))
                }
            })
            .catch(err => {
                console.log('error purchases', err)
                // history.push('/')
            })
    }
}
export const startAddPurchase = (data,regEnable) => {
    return (dispatch) => {
        axios.post('/purchases',data)
            .then(response => {
                // console.log(response)
                if(response.data.errors){
                    Swal.fire({
                        type: 'info',
                        text: "Check the fields"
                    })
                }else{
                    const purchase = response.data;
                    // console.log(purchase,'<----[NEW PURCHASE]')
                    dispatch(addPurchase(purchase))
                    regEnable()
                    dispatch(startListProducts())
                    purchase.products.map( product => {
                        dispatch(updateStockFromPurchase(product))
                        return null
                    })
                }
            })
            .catch(err => {
                Swal.fire({
                    type: 'error',
                    text: err
                })
            })
    }
}