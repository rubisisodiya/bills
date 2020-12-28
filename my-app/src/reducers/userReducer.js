const userReducer = (state = {}, action) => {
    switch(action.type) {
        case 'LOGIN_USER': {
            return {...state, isLoaded:true, isLoggedIn: true,...action.payload}
        }
        case 'LOGOUT_USER': {
            return {isLoggedIn: false}
        }
        case 'LOGIN_FAILURE': {
            return {isLoaded: true, isLoggedIn: false, notice: action.payload}
        }
        case 'ACTIVE_BUSINESS': {
            if (state.isLoaded === false) return {isLoaded: false, activeBusiness: action.payload}
            else return {...state, activeBusiness: action.payload}
        }
        default: {
            return state
        }
    }
}

export default userReducer