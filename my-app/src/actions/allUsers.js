import axios from '../config/axios'

const getUsers = (users) => {
    return {
        type: 'USERS_LIST', payload: users
    }
}
export const getUsersList = () => {
    return (dispatch) => {
        axios.get('/users')
            .then(response => {
                // console.log(response)
                if (response.data) {
                    dispatch(getUsers(response.data))
                }
            })
            .catch(err => {
                console.log('error users', err)
                // history.push('/')
            })
    }
}