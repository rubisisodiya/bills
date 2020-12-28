import React from 'react'
// import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import PeopleIcon from '@material-ui/icons/People';
import CategoryIcon from '@material-ui/icons/Category';
import ReceiptIcon from '@material-ui/icons/Receipt';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import GroupAddIcon from '@material-ui/icons/GroupAdd';

function Dashboard(props) {

    return (
        <>
        <br />
        <br />
        <br />
            {/* <h2 className="text-center">Dashboard</h2> */}
            <div  className="row ">
                <div className="col-md-4">
                    {/* <List> */}
                    <ListItem button  onClick={() => {
                        props.history.push(`/invoices`)
                    }}>
                        <ListItemIcon><ReceiptIcon/></ListItemIcon>
                        <ListItemText primary={'Invoices/Bills'} />
                    </ListItem>
                </div>
                <div className="col-md-4">
                    <ListItem button  onClick={() => {
                        props.history.push(`/purchases`)
                    }}>
                        <ListItemIcon><ShoppingBasketIcon/></ListItemIcon>
                        <ListItemText primary={'Purchases'} />
                    </ListItem>
                </div>
               
               
                <div className="col-md-4">
                    <ListItem button  onClick={() => {
                        props.history.push(`/products`)
                    }}>
                        <ListItemIcon><CategoryIcon/></ListItemIcon>
                        <ListItemText primary={'Products'} />
                    </ListItem>
                </div>
                <div className="col-md-4">
                    <ListItem button  onClick={() => {
                        props.history.push(`/categories`)
                    }}>
                        <ListItemIcon><CategoryIcon/></ListItemIcon>
                        <ListItemText primary={'Categories'} />
                    </ListItem>
                </div>
               
                
                <div className="col-md-4">
                    <ListItem button  onClick={() => {
                        props.history.push(`/customers`)
                    }}>
                        <ListItemIcon><GroupAddIcon/></ListItemIcon>
                        <ListItemText primary={'Customers'} />
                    </ListItem>
                {/* </List> */}
                </div>
            </div>
        </>
    )
}

export default Dashboard