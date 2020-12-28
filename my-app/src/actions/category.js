import axios from '../config/axios'

const getCategories = (categories) => {
    return {
        type: 'CATEGORY_LIST', payload: categories
    }
}
export const categoryPost = () =>{
    return {}
}
export const getCategoriesList = () => {
    return (dispatch) => {
        axios.get('/categories')
            .then(response => {
                // console.log(response)
                if (response.data) {
                    dispatch(getCategories(response.data))
                }
            })
            .catch(err => {
                console.log('error categories', err)
                // history.push('/')
            })
    }
}
