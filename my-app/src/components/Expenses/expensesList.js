import React from 'react'
import {connect} from 'react-redux'
import {getExpensesList} from '../../actions/expenses'
import {getExpenditureTypeList} from '../../actions/expenditureType'
import ExpenseForm from './expense-form'
import { Link } from 'react-router-dom'


class ExpenseList extends React.Component {
    componentDidMount(){
        this.props.dispatch(getExpensesList())
        this.props.dispatch(getExpenditureTypeList())
    }
    // handleSubmit= (data)=>{
    //     this.props.dispatch(startAddPurchase(data))
    // }

    render(){
        // console.log(this.props.dealers)
        return (
            <>
            <ExpenseForm />
            <h2>All Expenses</h2>
                <div className="row">
                <ul className="list-group">
                    {this.props.expenses.map((expense,index) => {
                        return <Link key={index} to={`/expenses/${expense._id}`}><li className="list-group-item">{expense.details}</li></Link>
                    })}
                </ul>
                </div>
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

export default connect(mapStateToProps)(ExpenseList)