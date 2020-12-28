import axios from '../config/axios'
import Swal from 'sweetalert2'
import { startUpdateProduct } from './product'
const getStocks = (stocks) => {
    return {
        type: 'STOCKS_LIST', payload: stocks
    }
}
const addStock = (stock)=>{
    return {
        type: 'ADD_STOCK',payload: stock
    }
}
const updateStock = (data)=>{
    return {
        type: 'UPDATE_STOCK',payload: data
    }
}
const removeStock = (id)=>{
    return {
        type: 'REMOVE_STOCK',payload: id
    }
}
export const getStocksList = () => {
    return (dispatch) => {
        axios.get('/stocks')
            .then(response => {
                // console.log(response)
                if (response.data) {
                    dispatch(getStocks(response.data))
                }
            })
            .catch(err => {
                console.log('error stocks', err)
                // history.push('/')
            })
    }
}
export const startAddStock = (data, product) => {
    return (dispatch) => {
        axios.post(`/stocks`,data,{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(res => {
            if(res.data.errors){
                Swal.fire({
                    type: 'error',
                    text: "Check the fileds"
                })
            }else{
                const stock = res.data;
                dispatch(addStock(stock));
                product.stock = stock._id;
                dispatch(startUpdateProduct(product._id, product));
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
export const UpdateStockQtyPurchase = (id,data,history) => {
    return (dispatch) => {
        axios.get(`/stocks/${id}`)
        .then(response => {
            //console.log(response)
           return response.data
        })
        .then(stock => {
            //console.log('stock value', stock);
            data.quantity += stock.quantity;
            axios.put(`/stocks/edit/${id}`,data,{
                headers: {
                    'x-auth': localStorage.getItem('authToken')
                }
            })
            .then(res => {
                if(res.data.errors){
                    Swal.fire({
                        type: 'error',
                        text: "Check the fileds"
                    })
                }else{
                    //console.log("called", res.data);
                    dispatch(updateStock(res.data._id,res.data))
                    // history.push('/stocks')
                    // window.location.reload()
                }
            })
            .catch(err => {
                Swal.fire({
                    type: 'error',
                    text: err
                })
            })
        })
        .catch(err => {
            console.log('error stocks', err)
            // history.push('/')
        })
    }
}
export const UpdateStockQtySell = (id,data,history) => {
    return (dispatch) => {
        axios.get(`/stocks/${id}`)
        .then(response => {
            //console.log(response)
           return response.data
        })
        .then(stock => {
            //console.log('stock value', stock);
            data.quantity = stock.quantity - data.quantity;
            axios.put(`/stocks/edit/${id}`,data,{
                headers: {
                    'x-auth': localStorage.getItem('authToken')
                }
            })
            .then(res => {
                if(res.data.errors){
                    Swal.fire({
                        type: 'error',
                        text: "Check the fileds"
                    })
                }else{
                    //console.log("called", res.data);
                    dispatch(updateStock(res.data))
                    // history.push('/stocks')
                    // window.location.reload()
                }
            })
            .catch(err => {
                Swal.fire({
                    type: 'error',
                    text: err
                })
            })
        })
        .catch(err => {
            console.log('error stocks', err)
            // history.push('/')
        })
    }
}

export const startRemoveStock = (id) => {
    return (dispatch) => {
        axios.delete(`/stocks/${id}`,{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(res => {
            if(res.data.errors){
                Swal.fire({
                    type: 'error',
                    text: "Check the fields"
                })
            }else{
                const stock = res.data;
                dispatch(removeStock(stock));
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