import Axios from 'axios'
const URL = window.location.origin.includes('localhost') ? "http://localhost:3005/api" : "/api"
const axios = Axios.create({
    baseURL: URL,
    headers: {
        "x-auth": localStorage.getItem('authToken') ? localStorage.getItem('authToken') : ""
    }
})

export default axios