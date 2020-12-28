import React from 'react'
import {connect} from 'react-redux'
import EmployeeForm from './EmployeeForm'
import Modal from 'react-modal'
import modalStyles from '../../../config/modalCss'
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add'
import { startRemoveEmployee } from '../../../actions/employee'
import {getUsersList} from '../../../actions/allUsers'

function Tabular(props){
    const { data } = props
    return (
        <div>
            <table border='1'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>EmpId</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Default Key</th>
                        <th>Phone</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{
                    data.map((emp,i) => {
                        return (<tr key={i}>
                            <td>{i+1}</td>
                            <td>{emp.employeeId}</td>
                            <td>{emp.profile.username}</td>
                            <td>{emp.profile.email}</td>
                            <td>{emp.key}</td>
                            <td>{emp.profile.phone}</td>
                            <td>
                                <button className='table-action-btn' onClick={() => {props.handleRemoveEmp(emp._id)}}>Remove</button>
                            </td>
                        </tr>)
                    })
                }
                </tbody>
            </table>
        </div>
    )
}

class DealersList extends React.Component {
    state={
        modalIsOpen: false
    }
    componentDidMount(){
        this.props.dispatch(getUsersList())
    }

    modalStatus = () => {
        this.setState(prevState => ({
            modalIsOpen: !prevState.modalIsOpen
        }))
    }

    handleRemoveEmp = (id) => {
        this.props.dispatch(startRemoveEmployee(id))
    }

    render(){
        // console.log(this.props.dealers)
        const {modalIsOpen} = this.state
        Modal.setAppElement('#root') 
        return (
            <>
                <Modal 
                    style={modalStyles}
                    isOpen={modalIsOpen}
                    // onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.modalStatus}
                    aria-labelledby="Create Category"
                    aria-describedby="simple-modal-description"
                >
                    <EmployeeForm modalStatus={this.modalStatus}/>
                </Modal>
                <IconButton className='tableButton' onClick={this.modalStatus}>
                    <Add />
                </IconButton>
                <h3>Employees </h3>
                <Tabular 
                    data = {this.props.employees} 
                    handleRemoveEmp= {this.handleRemoveEmp}
                />
                
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        employees: state.employees
    }
}

export default connect(mapStateToProps)(DealersList)