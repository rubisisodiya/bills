import React from 'react'
import {connect} from 'react-redux'
import {getCategoriesList} from '../../actions/category'
import CategoryForm from './CategoryForm'
import Add from '@material-ui/icons/Add'
import Modal from 'react-modal'
import modalStyles from '../../config/modalCss'
import axios from '../../config/axios';
import IconButton from '@material-ui/core/IconButton';

class CategoriesList extends React.Component {
    constructor(props){
        super(props)
        this.state= {
            modalIsOpen: false,
            isEdit: false,
            category: {}
        }
        
    }
    categoryDelete = (e) =>{
        // e.preventDefault()
        console.log(e.target.value)
        const id=e.target.value
        // console.log(id)
        axios.delete(`/categories/${id}`)
        .then(catgeory => {
            this.props.dispatch(getCategoriesList())
            
        })
        .catch(err =>{
            console.log(err)
        })
    }
    // componentDidMount(){
    //     this.props.dispatch(getCategoriesList())
    // }
     closeModal = () => {
        this.setState({modalIsOpen : false})
    }
    modalOpen = () =>{
        this.setState({modalIsOpen : true})
    }
    // this.Modal.setAppElement('#root')  
    categoryPost = (data) =>{
        axios.post('/categories',data)
        .then(catgeory => {
            this.closeModal()
            this.props.dispatch(getCategoriesList())
            
        })
        .catch(err =>{
            console.log(err)
        })
    }
    categoryUpdate = e =>{
        e.preventDefault();
        this.setState({
            isEdit: true,
            category: this.props.categories.find(cat => cat._id === e.target.id)
        })
    }
    categoryPut= e =>{
        e.preventDefault()
        // console.log(this.state.category.name)
        const id = e.target.id
        const data = {
            name:this.state.category.name
        }
        axios.put(`/categories/edit/${id}`,data)
        .then(response=>{
            this.setState({
                category: {}
            })
            this.props.dispatch(getCategoriesList())
        }).catch(err=>console.log(err))
    }
    handleChange= e =>{
        e.persist()
        this.setState((prevState) => {
           return{ category: {
               ...prevState.category,
                name: e.target.value
             }
            }
        })
    }
    

    render(){
       const {modalIsOpen} = this.state
       Modal.setAppElement('#root') 
        return (
            <>
            
            <Modal 
                style={modalStyles}
                isOpen={modalIsOpen}
                // onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                aria-labelledby="Create Category"
                aria-describedby="simple-modal-description"
            >
                <CategoryForm categoryPost={this.categoryPost}/>
            </Modal>
            <IconButton className='tableButton' onClick={this.modalOpen}>
                <Add />
            </IconButton>
                <h3>Categories </h3>
                <div className="row">

                
                    {this.props.categories.map((category,index) => {
                        // return <li key={index}> {category.name}</li>
                        return <div key={index}> 
                            <div className="card" style={{width: "18rem"}}>
                            <div className="card-body">
                                {this.state.category._id === category._id ? <input type="text" className="form-control" value={this.state.category.name} name="name" onChange={this.handleChange}/> : <h5 className="card-title">{category.name}</h5> 
                                }
                            {this.state.category._id === category._id ?<button className="btn btn-sm btn-primary" id={category._id} onClick={this.categoryPut}>Update</button> : <button className="btn btn-sm btn-info" id={category._id} onClick={this.categoryUpdate} >Edit</button>}
                            <button className="btn btn-sm btn-danger" value={category._id} onClick={this.categoryDelete}>Delete</button>
                            </div>
                            </div>
                        </div>
                    })}
                    </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories
    }
}

export default connect(mapStateToProps)(CategoriesList)