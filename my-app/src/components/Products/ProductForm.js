import React from 'react'
import {connect} from 'react-redux'
class ProductForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            name: props.name ? props.name : '',
            description: props.description ? props.description  : '',
            category: props.category ? props.category._id : '',
            price: props.price ? props.price : '',
            isEdit: props.isEdit || false,
            _id: props._id || ''
        }
    }
    handleSubmit=(e) => {
        e.preventDefault()
        // console.log(this.state)
        const {name, description,category,price} = this.state
        if(name === '' || description === '' || price === '' || category === ''){
            alert("Error")
        }else{
            const formData = {name,description,price,category}
            if(this.state.isEdit){
                this.props.productPut({...formData,_id: this.state._id})
            }else{
                this.props.productPost(formData)
            }
        }
    }
    handleChange= (e) => {
        // e.persist()
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    render(){
        // console.log('cat',this.props.categories)
        return (
            <>
            <form onSubmit={this.handleSubmit}>
            <input className="form-control" placeholder="Name" name="name" type="text" value={this.state.name} onChange={this.handleChange}
        />
        <input className="form-control" name="description" placeholder="Description" type="text" value={this.state.description} onChange={this.handleChange}
        />
        <select className="form-control" name="category" placeholder="Category" type="text" value={this.state.category} onChange={this.handleChange}
        >
            <option value="">Select Category</option>
            {this.props.categories.map(category =>{
                return <option key={ category._id} value={category._id}>{category.name}</option>
            })}
        </select>
        <input className="form-control" name="price" placeholder="Price" type="Number" value={this.state.price}onChange={this.handleChange}
        />
            <button className="btn btn-primary" >Submit</button>
            </form>
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        categories: state.categories
    }
}

export default connect(mapStateToProps)(ProductForm)