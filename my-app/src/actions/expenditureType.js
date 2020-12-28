import axios from '../config/axios'
import Swal from 'sweetalert2'

const getExpenditureTypes = (expenditureTypes) => {
    return {
        type: 'EXPENDITURE_TYPE_LIST', payload: expenditureTypes
    }
}
const addExpenditureType = (expenditureType)=>{
    return {
        type: 'ADD_EXPENDITURE_TYPE',payload: expenditureType
    }
}
export const getExpenditureTypeList = () => {
    return (dispatch) => {
        axios.get('/expenditureTypes')
            .then(response => {
                // console.log(response)
                if (response.data) {
                    dispatch(getExpenditureTypes(response.data))
                }
            })
            .catch(err => {
                console.log('error expenditureType', err)
                // history.push('/')
            })
    }
}

export const startAddExpenditureType = (data) => {
    return (dispatch) => {
        axios.post(`/expenditureTypes`,data,{
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
                dispatch(addExpenditureType(res.data))
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
