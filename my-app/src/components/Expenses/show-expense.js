import React from 'react'
import {connect} from 'react-redux'
import {getExpensesList} from '../../actions/expenses'
import {getExpenditureTypeList} from '../../actions/expenditureType'
// import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';


class ExpenseShow extends React.Component {
    componentDidMount(){
        this.props.dispatch(getExpensesList())
        this.props.dispatch(getExpenditureTypeList())
    }

    render(){
       const expense = this.props.expense
       const expenditureType = this.props.expenditureType
       console.log("expense", expenditureType);
        return (
            <>
            <h2>Expense Info</h2>
                <div className="row">
                    <div className="section">
                        { expense && 
                          <List>
                            <ListItem>
                                <ListItemText primary="Date" secondary={expense.date} />
                            </ListItem>
                            <Divider variant="inset" component="li"/>
                            <ListItem>
                                <ListItemText primary="Details" secondary={expense.details} />
                            </ListItem>
                            <Divider variant="inset" component="li"/>
                            <ListItem>
                                <ListItemText primary="Payment Details" secondary={expense.paymentDetails} />
                            </ListItem>
                            <Divider variant="inset" component="li"/>
                            <ListItem>
                                <ListItemText primary="Price" secondary={expense.price} />
                            </ListItem>
                            <Divider variant="inset" component="li"/>
                            <ListItem>
                                <ListItemText primary="Expenditure Type" secondary={expenditureType ? expenditureType.name : expense.expenditureType} />
                            </ListItem>
                            <Divider variant="inset" component="li"/>
                            </List>
                        }
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state,props) => {
    return {
        expense: state.expenses.find(e => e._id===props.match.params.id),
        expenditureType: state.expenditureTypes.find(exp => {
            const expense = state.expenses.find(e => e._id===props.match.params.id);
            if (expense) {
                if (expense.expenditureType === exp._id) {
                    return exp
                }
            }
            return null;
        })
    }
}

export default connect(mapStateToProps)(ExpenseShow)