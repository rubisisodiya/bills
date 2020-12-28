import React from 'react'
import {connect} from 'react-redux'
// import axios from '../../config/axios';
import {startAddExpenditureType} from '../../actions/expenditureType'
import {startAddExpenditure} from '../../actions/expenses'

class ExpenseForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            products: [],
            _id: "",
            name: "",
            price: "",
            quantity: "",
            date: '',
            dealer: "",
            invoice: `EXPO-INVOICE`,
            total: '',
            discount: "",
            tax: "",
            otherCharges: "",
            payMode: "",
            totalAmount: "",
            paymentDetails: "",
            details: "",
            isaddExpenditureTypeOpen: false,
            expenditureType: "",
            addExpenditure: ""
        }
    }
    
    handleChange= (e) => {
        // e.persist()
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    expenditureTypeChange = e =>{
        let isOpen = false;
        const value = e.target.value;
    if (value === "others") {
        isOpen = true
    } else {
        isOpen = false
    }
        this.setState((prevState)=>{
            return {
                isaddExpenditureTypeOpen: isOpen,
                expenditureType: value
            }
        })

    }
    addToPurchaseList = e =>{
        e.preventDefault()
        if(this.state._id){
            this.setState((prevState) => {
                return{
                    products: [...prevState.products, {_id: this.state._id,price: this.state.price, quantity: this.state.quantity,name: this.state.name}],
                    _id: "",
                    price: "",
                    quantity: "",
                    total: Number(prevState.total) + (Number(this.state.price) * Number(this.state.quantity)),
                    totalAmount: Number(prevState.total) + (Number(this.state.price) * Number(this.state.quantity))
                }
            })
        }
    }
    expenditureTypePost = () =>{
        const data = {
            name: this.state.addExpenditure
        }
        this.props.dispatch(startAddExpenditureType(data))
        this.setState((prevState)=>{
            return {
                isaddExpenditureTypeOpen: false,
                expenditureType: "",
                addExpenditure: ""
            }
        })
    }
    handleSubmit=(e) => {
        e.preventDefault()
        const {date,details,price,paymentDetails,payMode,expenditureType} = this.state
        const data = {
            date,
            details,
            payMode,
            paymentDetails,
            price,
            expenditureType
        }
        this.props.dispatch(startAddExpenditure(data))
        this.setState({
            date: '',
            payMode: "",
            price: "",
            paymentDetails: "",
            details: "",
            isaddExpenditureTypeOpen: false,
            expenditureType: "",
            addExpenditure: ""
        })
    }
    taxBlur= (e)=>{
        const amount= this.state.products.map(p => p.price*p.quantity).reduce((a,b)=> {return a+b},0)
        this.setState((prevState)=> {
            return {total: Number(amount) + Number(amount) * Number(this.state.tax) /100, 
                totalAmount: Number(amount) + Number(amount) * Number(this.state.tax) /100
            }
        })
    }
    discountBlur = (e)=>{
        this.setState((prevState)=>{
            return {
                totalAmount: Number(prevState.totalAmount) - Number(prevState.total) * Number(prevState.discount) / 100 
            }
        })
    }
    otherChargesBlur = e =>{
        this.setState((prevState)=>{
            return {
                totalAmount: Number(prevState.totalAmount) + Number(prevState.otherCharges)
            }
        })
    }
    render(){
        console.log('cat',this.props.expenditureType);
        const {price,expenditureType,addExpenditure,paymentDetails,details,payMode,date} = this.state
        return (
            <>  
            <h2>Add Expenses</h2>
            <form onSubmit={this.handleSubmit}>
                
                    <div className="form-row">
                        <div className="col">
                            <select className="form-control" placeholder="Expenditure Type" name="_id"   value={expenditureType} onChange={this.expenditureTypeChange}
                        > <option value="">Select Expenditure Type</option>
                            {this.props.expenditureType.map((expenditureType,index) => {
                                return <option key={expenditureType._id} value={expenditureType._id}>{expenditureType.name}</option>
                            })}
                            <option value="others">Others</option>
                        </select>
                        </div>
                        { this.state.isaddExpenditureTypeOpen ? 
                        <div  className="col">
                            &nbsp;
                            <div  className="row" style={{'marginTop': "-20px"}}>
                                <div className="col">  
                                    <input className="form-control" name="addExpenditure" placeholder="Add Expenditure type" type="text" value={addExpenditure} onChange={this.handleChange}
                                    />
                                </div>
                                <div className="col" style={{'marginTop': "-20px"}}>
                                    <button className="btn btn-sm btn-info"  onClick={this.expenditureTypePost}
                                    >Add Expenditure Type</button>
                                </div>
                            </div>
                        </div>
                        : 
                            <div className="col">
                            </div>
                        }
                    </div>
                    {/* <Add onClick={this.addProduct}/> */}
                    <br />
                    <div className="form-row">
                        <div className="col">
                            <input className="form-control" name="date" placeholder="Date" type="date" value={date} onChange={this.handleChange}
                            />
                        </div>
                        <div className="col">
                            <select className="form-control" name="payMode" placeholder="Pay Mode" value={payMode} onChange={this.handleChange}
                            >
                                <option>Select Pay Mode</option>
                                {['Net-Banking','Cash','UPI','Cheque'].map((pay)=>{
                                    return <option key={pay} value={pay}>{pay}</option>
                                })}
                            </select>
                        </div>
                    </div>
                    <br/>
                    <div className="form-row">
                    <div className="col">
                            <textarea className="form-control" name="details" placeholder=" Details" type="text" value={details} onChange={this.handleChange}
                            />
                        </div>
                        <div className="col">
                            <textarea className="form-control" name="paymentDetails" placeholder="Payment Details" type="text" value={paymentDetails} onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <br/>
                    <div className="form-row">
                        <div className="col">  
                        <input className="form-control" name="price" placeholder="Price" type="Number" value={price}onChange={this.handleChange}
                        />
                        </div>
                        <div className="col" style={{'marginTop': "-20px"}}>
                            <button className="btn btn-primary" >Submit</button>
                        </div>
                        <div className="col">
                        </div>
                    </div>
            </form>
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        expenses: state.expenses,
        expenditureType: state.expenditureTypes
    }
}

export default connect(mapStateToProps)(ExpenseForm)