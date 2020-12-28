import React from 'react'
import {connect} from 'react-redux'
import {getStocksList} from '../../actions/stock'
import { startListProducts } from '../../actions/product'
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit'
import StockForm from './StockForm'
import Swal from 'sweetalert2'
import axios from '../../config/axios';

class StocksList extends React.Component {
    constructor(props){
        super(props)
        this.state= {
            stock: {}
        }
        
    }
    componentDidMount(){
        this.props.dispatch(getStocksList())
        this.props.dispatch(startListProducts())
    }
    edit = (id) =>{
        this.setState({
            stock: this.props.stocks.find(stock => stock._id === id)
        })
    }
    updateStock = (data)=>{
        console.log(data)
        axios.put(`/stocks/edit/${data._id}`,data,{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(res => {
            if(res.data.errors){
                Swal.fire({
                    type: 'error',
                    text: "Check the fileds"
                })
            }else{
                this.setState({stock: {}})
                this.props.dispatch(getStocksList())

            }
        })
        .catch(err => {
            Swal.fire({
                type: 'error',
                text: err
            })
        })
    }
    render(){
        const { stocks, products } = this.props;
        console.log(stocks,'<---stock',products)
        return (
            <>
                <h3>Stocks </h3>
                <div className="row">
                    {stocks.length>0 && stocks.map((stock,index) => {
                        return <div key={index}> 
                            <div className="card" style={{width: "18rem"}}>
                            <div className="card-body">
                            <h5 className="card-title">
                                {stock.product.name} 
                                <span>
                                <IconButton className='tableButton' onClick={()=>this.edit(stock._id)}>
                                    <Edit />
                                </IconButton>
                                </span>
                            </h5>
                            <div>
                                {this.state.stock._id === stock._id ?<StockForm stockPut={this.updateStock} stocks={stocks} quantity={stock.quantity} stockPrice={stock.stockPrice} _id={stock._id}/> :
                                <>
                                    <p>Quantity:  {stock.quantity}</p>
                                    <p>Price:  {stock.stockPrice}</p>
                                </>
                                }
                            </div>
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
        stocks: state.stocks,
        products: state.products
    }
}

export default connect(mapStateToProps)(StocksList)