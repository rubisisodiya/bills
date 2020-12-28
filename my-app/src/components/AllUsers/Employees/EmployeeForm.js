import { connect } from 'react-redux'
import React, { Component } from 'react'
import { startAddEmployee } from '../../../actions/employee'
import shortid from 'shortid'

class EmployeeForm extends Component {
    state = {
        employeeId: `${Number(Date.now())}`.slice(6),
        username: '',
        password: shortid.generate(),
        phone: '',
        address: '',
        email: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { employeeId, username, password, email, address, phone } = this.state
        const fd = {
            employeeId, username, password, email, address, phone
        }
        if(username=== '' || password==='' || email==='' || phone==='' || employeeId===''){
            alert('Please fill in the fields')
        }else{
            this.props.dispatch(startAddEmployee(fd))
        }
        this.setState({
            employeeId: '',
            username: '',
            password: '',
            phone: '',
            address: '',
            email: ''
        })
        this.props.modalStatus()
        //console.log(fd)
    }
    render() {
        const { employeeId, username, password, email, address, phone } = this.state
        return (
            <>  
                <h2>Add Employee</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className='form-row employeeAdd'>
                        <div className="col">
                            <input className='form-control' name='employeeId' value={employeeId} onChange={this.handleChange} type="text" placeholder='Employee Id'/>
                        </div>

                        <div className="col"><input className='form-control' name='username' value={username} onChange={this.handleChange} type="text" placeholder='username'/></div>

                        <div className="col"><input className='form-control' name='email' value={email} onChange={this.handleChange} type="email" placeholder='Email'/></div>

                        <div className="col"><input className='form-control' name='password' value={password} onChange={this.handleChange} type="text" placeholder='password'/></div>

                        <div className="col"><input className='form-control' type='number' value={phone} name='phone' onChange={this.handleChange} placeholder='phone'/></div>

                        <div className="col"><input className='form-control' name='address' value={address} onChange={this.handleChange} type="text" placeholder='Address'/></div>

                        <button className="btn btn-primary" type='submit' >Add</button>
                    </div>
                </form>
            </>
        )
    }
}

export default connect()(EmployeeForm)

