import React from 'react'
import {connect} from 'react-redux'
class StockForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            quantity: props.quantity ? props.quantity : '',
            stockPrice: props.stockPrice ? props.stockPrice  : '',
            _id: props._id || ''
        }
    }
    handleSubmit=(e) => {
        e.preventDefault()
        // console.log(this.state)
        const {quantity, stockPrice,_id} = this.state
        if(quantity === '' || stockPrice === ''){
            alert("Error")
        }else{
            const formData = {quantity, stockPrice}
            this.props.stockPut({...formData, _id})
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
            <input className="form-control" placeholder="Quantity" name="quantity" type="text" value={this.state.quantity} onChange={this.handleChange}
            />
            <input className="form-control" name="stockPrice" placeholder="Stock Price" type="text" value={this.state.stockPrice} onChange={this.handleChange}
            />
            <button className="btn btn-primary" >Submit</button>
            </form>
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        stocks: state.stocks
    }
}

export default connect(mapStateToProps)(StockForm)