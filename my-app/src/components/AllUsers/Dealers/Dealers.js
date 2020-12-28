import React, { Component } from 'react'
import {connect} from 'react-redux'
import Modal from 'react-modal'
import modalStyles from '../../../config/modalCss'
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add'
import DealerAdd from './DealerAdd';
import { startRemoveDealer } from '../../../actions/dealer';

function Tabular(props){
    const { data } = props
    return (
        <div>
            <table border='1'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>GSTN</th>
                        <th>Company Name</th>
                        <th>Company Phone</th>
                        <th>Company Address</th>
                        <th>Dealer Name</th>
                        <th>Phone</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{
                    data.map((dealer,i) => {
                        return (<tr key={i}>
                            <td>{i+1}</td>
                            <td>{dealer.gstn}</td>
                            <td>{dealer.companyName}</td>
                            <td>{dealer.companyPhone}</td>
                            <td>{dealer.companyAddress}</td>
                            <td>{dealer.dealerName}</td>
                            <td>{dealer.dealerPhone}</td>
                            <td>
                                <button className='table-action-btn' onClick={() => {props.handleEditDealer(dealer._id,dealer)}}>Edit</button>
                                <button className='table-action-btn' onClick={() => {props.handleRemoveDealer(dealer._id)}}>Remove</button>
                            </td>
                        </tr>)
                    })
                }
                </tbody>
            </table>
        </div>
    )
}

class Dealers extends Component {
    state={
        modalIsOpen: false,
        dealer: null,
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
            dealer: null,
            isEdit: false
        })
        this.modalStatus()
    }

    handleRemoveDealer = (id) => {
        this.props.dispatch(startRemoveDealer(id))
    }

    handleEditDealer = (id, dealer) => {
        this.setState({
            dealer,
            isEdit: true,
            id
        })
        this.modalStatus()
    }

    render() {
        const { modalIsOpen ,dealer ,isEdit , id } = this.state
        const { dealers } = this.props
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
                    <DealerAdd 
                        modalStatus={this.modalStatus}
                        {...dealer}
                        isEdit={isEdit}
                        id={id}
                        handleClearEdit={this.handleClearEdit}
                    />
                </Modal>
                <IconButton className='tableButton' onClick={this.modalStatus}>
                    <Add />
                </IconButton>
                <h3>Dealers </h3>
                <Tabular 
                    data={dealers}
                    handleRemoveDealer={this.handleRemoveDealer}
                    handleEditDealer={this.handleEditDealer}
                />
            </>
        )}
}

const mapStateToProps = state => {
    return {
        dealers: state.dealers
    }
}

export default connect(mapStateToProps)(Dealers)
