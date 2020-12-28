import React from 'react'
import {connect} from 'react-redux'
import { Button} from '@material-ui/core';
class CategoryForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: ''
        }
    }
    handleSubmit=(e) => {
        e.preventDefault()
        if(this.state.name !== ''){
            const formData = {
                name: this.state.name
            }
            this.props.categoryPost(formData)
        }else{
            alert("Enter Category Name")
        }
    }
    handleChange= (e) => {
        // e.persist()
        this.setState({
            name: e.target.value
        })
    }
    render(){
        return (
            <>
                    <input className="form-control" placeholder="Name"
          label="Name"
          type="text"
          value={this.state.name}
           onChange={this.handleChange}
        />
                    <Button onClick={this.handleSubmit}>Submit</Button>
            </>
        )
    }
}
export default connect()(CategoryForm)