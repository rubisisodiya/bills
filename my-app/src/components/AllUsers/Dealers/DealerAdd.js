import React, { Component } from 'react'
import {connect} from 'react-redux'
import { startAddDealer, startUpdateDealer } from '../../../actions/dealer'

class DealerAdd extends Component {
    constructor(props){
        super(props)
        this.state = {
            gstn: props.gstn ? props.gstn : '',
            companyName: props.companyName ? props.companyName : '',
            companyPhone: props.companyPhone ? props.companyPhone : '',
            companyAddress: props.companyAddress ? props.companyAddress : '',
            dealerName: props.dealerName ? props.dealerName : '',
            dealerPhone: props.dealerPhone ? props.dealerPhone : '',
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
        const { gstn, companyName, companyPhone, companyAddress, dealerName, dealerPhone, isEdit } = this.state
        const fd = {
            gstn, companyName, companyPhone, companyAddress, dealerName, dealerPhone
        }
        if(isEdit){
            //console.log(this.props.id,'------->IDs')
            this.props.dispatch(startUpdateDealer(this.props.id,fd))
            this.props.handleClearEdit()
        }else{
            if(gstn === '' || dealerName ===''||dealerPhone ===''){
                alert('Please fill in the fields')
            }else {
                console.log(fd)
                this.props.dispatch(startAddDealer(fd))
                this.props.modalStatus()
            }
        }
        this.setState({
            gstn: '',
            companyName: '',
            companyPhone: '',
            companyAddress: '',
            dealerName: '',
            dealerPhone: '',
        })
    }

    render() {
        const { gstn, companyName, companyPhone, companyAddress, dealerName, dealerPhone, isEdit } = this.state
        return (
            <>  
                <h2>{isEdit ? 'Edit Dealer':'Add Dealer'}</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className='form-row customerAdd'>
                        <div className="col">
                            <input className='form-control' name='gstn' value={gstn} onChange={this.handleChange} type="text" placeholder='#GSTN'/>
                        </div>

                        <div className="col"><input className='form-control' name='companyName' value={companyName} onChange={this.handleChange} type="text" placeholder='Company name'/></div>

                        <div className="col"><input className='form-control' type='number' value={companyPhone} name='companyPhone' onChange={this.handleChange} placeholder='Company phone'/></div>

                        <div className="col"><textarea className='form-control' name='companyAddress' value={companyAddress} onChange={this.handleChange} type="text" placeholder='Company address'/></div>

                        <div className="col"><input className='form-control' name='dealerName' value={dealerName} onChange={this.handleChange} type="text" placeholder='Dealer name'/></div>

                        <div className="col"><input className='form-control' name='dealerPhone' value={dealerPhone} onChange={this.handleChange} type="number" placeholder='Dealer Phone'/></div>

                        {isEdit && <button className="btn btn-primary" type='button' onClick={() => {this.props.handleClearEdit()}}>Clear</button>}
                        <button className="btn btn-primary" type='submit' >{isEdit ? 'Update' : 'Add'}</button>
                    </div>
                </form>
            </>
        )
    }
}

export default connect()(DealerAdd)
