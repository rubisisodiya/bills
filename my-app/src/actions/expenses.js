import axios from '../config/axios'
import Swal from 'sweetalert2'

const getExpenses = (expenses) => {
    return {
        type: 'EXPENSES_LIST', payload: expenses
    }
}
const addExpense = (expense)=>{
    return {
        type: 'ADD_EXPENSE',payload: expense
    }
}
export const getExpensesList = () => {
    return (dispatch) => {
        axios.get('/expenditures')
            .then(response => {
                // console.log(response)
                if (response.data) {
                    dispatch(getExpenses(response.data))
                }
            })
            .catch(err => {
                console.log('error Expenses', err)
                // history.push('/')
            })
    }
}

export const startAddExpenditure = (data) => {
    return (dispatch) => {
        axios.post(`/expenditures`,data,{
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
                console.log('added responseexpense', res.data)
                dispatch(addExpense(res.data))
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