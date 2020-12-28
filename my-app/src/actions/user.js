import axios from '../config/axios'

const loginUser = (user) => {
    return {
        type: 'LOGIN_USER', payload: user
    }
}

const logoutUser = () => {
    return {
        type: 'LOGOUT_USER'
    }
}

const failedLogin = (notice) => {
    return {
        type: 'LOGIN_FAILURE', payload: notice
    }
}

export const setActiveBusiness = (id) => {
    return {
        type: 'ACTIVE_BUSINESS', payload: id
    }
}

export const startCheckUserAuth = () => {
    return (dispatch, getState) => {
        axios.get('/users/check-login')
            .then(response => {
                // console.log(response)
                if (response.data.username) {
                    const user = {
                        username: response.data.username,
                        role: response.data.role
                    }
                    dispatch(loginUser(user))
                }
            })
            .catch(err => {
                console.log('check login', err)
                // history.push('/')
            })
    }
}

export const startPostUserLogin = (formData, history) => {
    return dispatch => {
        axios.post('/users/login', formData)
            .then(response => {
                if (response.data.notice) {
                    const notice = response.data.notice
                    dispatch(failedLogin(notice))
                } else {
                    // console.log(response)
                    const token = response.data.token
                    const user = {
                        username: response.data.userName,
                        role: response.data.userName
                    }
                    localStorage.setItem('authToken', token)
                    dispatch(loginUser(user))
                    history.push('/dashboard')
                }
            })
            .catch(err => {
                console.log('Login error', err)
            })
    }
}

export const startPostUserLogout = (formData) => {
    return dispatch => {
        axios.delete('/users/logout', formData)
            .then(() => {
                localStorage.clear()
                dispatch(logoutUser())
                dispatch({type: 'LOGOUT'})
            })
            .catch(err => {
                console.log('Logout error', err)
            })
    }
}