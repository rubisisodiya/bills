import React, { Component } from 'react'
import {connect} from 'react-redux'
import { startAddCustomer, startUpdateCustomer } from '../../../actions/customer'

class CustomerAdd extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: props.name ? props.name : '',
            email: props.email ? props.email : '',
            phone: props.phone ? props.phone : '',
            address: props.address ? props.address : '',
            isEdit: props.isEdit || false,
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { name, email, phone, address, isEdit } = this.state
        const fd = {
            name, email, phone, address
        }
        if(isEdit){
            //console.log(this.props.id,'------->IDDDs')
            this.props.dispatch(startUpdateCustomer(this.props.id,fd))
            this.props.handleClearEdit()
        }else{
            if(name === '' || email===''||phone===''){
                alert('Please fill in the fields')
            }else {
                this.props.dispatch(startAddCustomer(fd))
                this.props.modalStatus()
            }
        }
        //console.log('SUBMIT-CUSTOMER',this.props.id,fd)
        this.setState({
            name: '',
            email:'',
            phone:'',
            address:'',
        })
    }

    render() {
        const { name, email, phone, address, isEdit } = this.state
        return (
            <>  
                <h2>{isEdit ? 'Edit Customer':'Add Customer'}</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className='form-row customerAdd'>
                        <div className="col">
                            <input className='form-control' name='name' value={name} onChange={this.handleChange} type="text" placeholder='Name'/>
                        </div>

                        <div className="col"><input className='form-control' name='email' value={email} onChange={this.handleChange} type="email" placeholder='Email'/></div>

                        <div className="col"><input className='form-control' type='number' value={phone} name='phone' onChange={this.handleChange} placeholder='phone'/></div>

                        <div className="col"><textarea className='form-control' name='address' value={address} onChange={this.handleChange} type="text" placeholder='Address'/></div>

                        {isEdit && <button className="btn btn-primary" type='button' onClick={() => {this.props.handleClearEdit()}}>Clear</button>}
                        <button className="btn btn-primary" type='submit' >{isEdit ? 'Update' : 'Add'}</button>
                    </div>
                </form>
            </>
        )
    }
}

export default connect()(CustomerAdd)
