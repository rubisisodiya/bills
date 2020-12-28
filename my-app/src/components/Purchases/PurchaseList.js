import React, { Fragment } from 'react'
import {connect} from 'react-redux'
import {getPurchasesList} from '../../actions/purchase'
import FormPurchase from './FormPurchase'
import { Link } from 'react-router-dom'
import { Grid } from '@material-ui/core'


class PurchaseList extends React.Component {
    componentDidMount(){
        this.props.dispatch(getPurchasesList())
    }

    render(){
        return (
            <Fragment>
                <Grid container spacing={8}> 
                    <Grid item xs={9} zeroMinWidth>
                    <h2>Add Purchases</h2>
                    <FormPurchase />
                    </Grid>
                    <Grid item xs={3} zeroMinWidth>
                        <h2>Purchases </h2>
                        <div className="row">
                            <ul className="list-group">
                                {this.props.purchases.map((purchase,index) => {
                                    return <Link key={index} to={`/purchases/${purchase._id}`}><li className="list-group-item">{purchase.invoice}</li></Link>
                                })}
                            </ul>
                        </div>
                    </Grid>  
                </Grid>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        purchases: state.purchases
    }
}

export default connect(mapStateToProps)(PurchaseList)