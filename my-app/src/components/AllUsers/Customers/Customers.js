import React, { Component } from 'react'
import {connect} from 'react-redux'
import Modal from 'react-modal'
import modalStyles from '../../../config/modalCss'
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add'
import CustomerAdd from './CustomerAdd';
import { startRemoveCustomer } from '../../../actions/customer';

function Tabular(props){
    const { data } = props
    return (
        <div>
            <table border='1'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{
                    data.map((cus,i) => {
                        return (<tr key={i}>
                            <td>{i+1}</td>
                            <td>{cus.name}</td>
                            <td>{cus.email}</td>
                            <td>{cus.phone}</td>
                            <td>{cus.address}</td>
                            <td>
                                <button className='table-action-btn' onClick={() => {props.handleEditCustomer(cus._id,cus)}}>Edit</button>
                                <button className='table-action-btn' onClick={() => {props.handleRemoveCustomer(cus._id)}}>Remove</button>
                            </td>
                        </tr>)
                    })
                }
                </tbody>
            </table>
        </div>
    )
}

class Customers extends Component {
    state={
        modalIsOpen: false,
        customer: null,
        isEdit: false,
        id: ''
    }

    modalStatus = () => {
        this.setState(prevState => ({
            modalIsOpen: !prevState.modalIsOpen
        }))
    }

    handleClearEdit = () => {
        this.setState({
            id: '',
            customer: null,
            isEdit: false
        })
        this.modalStatus()
    }

    handleRemoveCustomer = (id) => {
        this.props.dispatch(startRemoveCustomer(id))
    }

    handleEditCustomer = (id, customer) => {
        this.setState({
            customer,
            isEdit: true,
            id
        })
        this.modalStatus()
    }

    render() {
        const { modalIsOpen ,customer ,isEdit , id } = this.state
        const { customers } = this.props
        Modal.setAppElement('#root') 
        return (
            <>
                <Modal 
                    style={modalStyles}
                    isOpen={modalIsOpen}
                    // onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.modalStatus}
                    aria-labelledBy="Create Category"
                    aria-describedBy="simple-modal-description"
                >
                    <CustomerAdd 
                        modalStatus={this.modalStatus}
                        {...customer}
                        isEdit={isEdit}
                        id={id}
                        handleClearEdit={this.handleClearEdit}
                    />
                </Modal>
                <IconButton className='tableButton' onClick={this.modalStatus}>
                    <Add />
                </IconButton>
                <h3>Customers </h3>
                <Tabular 
                    data={customers}
                    handleRemoveCustomer={this.handleRemoveCustomer}
                    handleEditCustomer={this.handleEditCustomer}
                />
            </>
        )}
}

const mapStateToProps = state => {
    return {
        customers: state.customers
    }
}

export default connect(mapStateToProps)(Customers)
