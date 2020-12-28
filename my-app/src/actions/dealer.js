import axios from '../config/axios'
import Swal from 'sweetalert2'
const getToken = localStorage.getItem('authToken')

const getDealers = (deal) => {
    return {
        type: 'DEALERS_LIST', payload: deal
    }
}
const addDealer = (data)=>{
    return {
        type: 'ADD_DEALER',payload: data
    }
}

const updateDealer = (deal)=>{
    return {
        type: 'UPDATE_DEALER',payload: deal
    }
}

const removeDealer = (id)=>{
    return {
        type: 'REMOVE_DEALER',payload: id
    }
}


export const startListDealers = () => {
    return (dispatch) => {
        axios.get('/dealers')
            .then(response => {
                //console.log(response)
                if (response.data) {
                    dispatch(getDealers(response.data))
                }
            })
            .catch(err => {
                console.log('error dealers', err)
            })
    }
}

export const startAddDealer = (data) => {
    return (dispatch) => {
        axios.post(`/dealers`,data,{
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
                const deal = res.data;
                dispatch(addDealer(deal))
                //console.log('CUS-ADDED', deal)
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

export const startUpdateDealer = (id,data) => {
    return (dispatch) => {
        axios.put(`/dealers/edit/${id}`,data,{
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
                dispatch(updateDealer(upCus))
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

export const startRemoveDealer = (id) => {
    return (dispatch) => {
        axios.delete(`/dealers/${id}`,{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(res => {
            //console.log(res, 'DEL-CUS')
            dispatch(removeDealer(res.data._id))
        })
        .catch(err => {
            Swal.fire({
                type: 'error',
                text: err
            })
        })
    }
}