import axios from '../config/axios'
import Swal from 'sweetalert2'
const getToken = localStorage.getItem('authToken')

const getCustomers = (cus) => {
    return {
        type: 'CUSTOMERS_LIST', payload: cus
    }
}
const addCustomer = (data)=>{
    return {
        type: 'ADD_CUSTOMER',payload: data
    }
}

const updateCustomer = (cus)=>{
    return {
        type: 'UPDATE_CUSTOMER',payload: cus
    }
}

const removeCustomer = (id)=>{
    return {
        type: 'REMOVE_CUSTOMER',payload: id
    }
}


export const startListCustomers = () => {
    return (dispatch) => {
        axios.get('/customers')
            .then(response => {
                //console.log(response)
                if (response.data) {
                    dispatch(getCustomers(response.data))
                }
            })
            .catch(err => {
                console.log('error customers', err)
            })
    }
}

export const startAddCustomer = (data) => {
    return (dispatch) => {
        axios.post(`/customers`,data,{
            headers: {
                'x-auth': getToken
            }
        })
        .then(res => {
            if(res.data.errors){
                Swal.fire({
                    type: 'error',
                    text: "Check the fields"
                })
            }else{
                const cus = res.data;
                dispatch(addCustomer(cus))
                //console.log('CUS-ADDED', cus)
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

export const startUpdateCustomer = (id,data) => {
    return (dispatch) => {
        axios.put(`/customers/edit/${id}`,data,{
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
                //console.log(res.data,'UPT-CUS')
                const upCus = res.data
                dispatch(updateCustomer(upCus))
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

export const startRemoveCustomer = (id) => {
    return (dispatch) => {
        axios.delete(`/customers/${id}`,{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(res => {
            //console.log(res, 'DEL-CUS')
            dispatch(removeCustomer(res.data._id))
        })
        .catch(err => {
            Swal.fire({
                type: 'error',
                text: err
            })
        })
    }
}