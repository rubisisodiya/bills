import axios from '../config/axios'
import Swal from 'sweetalert2'
const getToken = localStorage.getItem('authToken')

const getEmployees = (emps) => {
    return {
        type: 'EMPLOYEES_LIST', payload: emps
    }
}
const addEmployee = (data)=>{
    return {
        type: 'ADD_EMPLOYEE',payload: data
    }
}

// const updateProduct = (id,product)=>{
//     return {
//         type: 'UPDATE_PRODUCT',payload: {id,product}
//     }
// }

const removeEmployee = (id)=>{
    return {
        type: 'REMOVE_EMPLOYEE',payload: id
    }
}


export const startListEmployees = () => {
    return (dispatch) => {
        axios.get('/employees')
            .then(response => {
                //console.log(response)
                if (response.data) {
                    dispatch(getEmployees(response.data))
                }
            })
            .catch(err => {
                console.log('error products', err)
            })
    }
}

export const startAddEmployee = (data) => {
    return (dispatch) => {
        axios.post(`/employees`,data,{
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
                const emp = res.data;
                dispatch(addEmployee(emp))
                //console.log('EMP-ADDED', emp)
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
// export const startUpdateProduct = (id,data,history) => {
//     return (dispatch) => {
//         axios.put(`/products/edit/${id}`,data,{
//             headers: {
//                 'x-auth': localStorage.getItem('authToken')
//             }
//         })
//         .then(res => {
//             if(res.data.errors){
//                 Swal.fire({
//                     type: 'error',
//                     text: "Check the fileds"
//                 })
//             }else{
//                 dispatch(updateProduct(res.data._id,res.data))
//                 // history.push('/products')
//                 window.location.reload()
//             }
//         })
//         .catch(err => {
//             Swal.fire({
//                 type: 'error',
//                 text: err
//             })
//         })
//     }
// }

export const startRemoveEmployee = (id) => {
    return (dispatch) => {
        axios.delete(`/employees/${id}`,{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(res => {
            //console.log(res, 'DEL-EMP')
            dispatch(removeEmployee(res.data._id))
        })
        .catch(err => {
            Swal.fire({
                type: 'error',
                text: err
            })
        })
    }
}