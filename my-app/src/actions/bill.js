import axios from '../config/axios'
import Swal from 'sweetalert2'
import { UpdateStockQtySell } from './stock'

const getBill = (bills) => {
    return {
        type: 'BILLS_LIST', payload: bills
    }
}
const addBill=(bill)=>{
    return {
        type: "ADD_BILL", payload: bill
    }
}
export const getBillsList = () => {
    return (dispatch) => {
        axios.get('/bills')
            .then(response => {
                // console.log(response)
                if (response.data) {
                    dispatch(getBill(response.data))
                }
            })
            .catch(err => {
                console.log('error bills', err)
                // history.push('/')
            })
    }
}
export const startAddBill = (data,regEnable) => {
    return (dispatch) => {
        axios.post('/bills',data)
            .then(response => {
                // console.log(response)
                if(response.data.errors){
                    Swal.fire({
                        type: 'info',
                        text: "Check the fileds"
                    })
                }else{
                    const bill = response.data;
                    dispatch(addBill(bill))
                    regEnable()
                    bill.products.map( product => {
                        const data = {};
                        data.quantity = product.quantity;
                        dispatch(UpdateStockQtySell(product.stock, data))
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