import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {startPostUserLogout, setActiveBusiness} from '../../actions/user'
import MenuIcon from '@material-ui/icons/Menu'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import PeopleIcon from '@material-ui/icons/People';
import CategoryIcon from '@material-ui/icons/Category';
import ShopIcon from '@material-ui/icons/Shop';
import ReceiptIcon from '@material-ui/icons/Receipt';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import DashboardIcon from '@material-ui/icons/Dashboard';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
class Header extends React.Component {

    constructor() {
        super()
        this.state = {
            drawerIsOpen: false
        }
    }

    componentDidMount() {
        const id = this.props.location.pathname.slice(12, 36)
        if (this.props.user.activeBusiness !== id) {
            this.props.dispatch(setActiveBusiness(id))
            // console.log('i ran')
        }
    }

    toggleDrawer = (open) => {
        this.setState({drawerIsOpen: open})
    } 

    render() {
        return (
        <div className="header">
            
            {this.props.location.pathname.includes('/') ?
             <>
             <Drawer open={this.state.drawerIsOpen} onClose={() => this.toggleDrawer(false)}>
                <List>
                    <ListItem button  onClick={() => {
                        this.toggleDrawer(false)
                        this.props.history.push(`/dashboard`)
                    }}>
                        <ListItemIcon><DashboardIcon/></ListItemIcon>
                        <ListItemText primary={'Dashboard'} />
                    </ListItem>
                    <ListItem button  onClick={() => {
                        this.toggleDrawer(false)
                        this.props.history.push(`/stocks`)
                    }}>
                        <ListItemIcon><ShopIcon/></ListItemIcon>
                        <ListItemText primary={'Stocks'} />
                    </ListItem>
                    
                </List>
                <Divider />
                <List>
                    <ListItem button  onClick={() => {
                        this.toggleDrawer(false)
                        this.props.history.push(`/invoices`)
                    }}>
                        <ListItemIcon><ReceiptIcon/></ListItemIcon>
                        <ListItemText primary={'Invoices/Bills'} />
                    </ListItem>
                    <ListItem button  onClick={() => {
                        this.toggleDrawer(false)
                        this.props.history.push(`/purchases`)
                    }}>
                        <ListItemIcon><ShoppingBasketIcon/></ListItemIcon>
                        <ListItemText primary={'Purchases'} />
                    </ListItem>
                   
                    <ListItem button  onClick={() => {
                        this.toggleDrawer(false)
                        this.props.history.push(`/products`)
                    }}>
                        <ListItemIcon><CategoryIcon/></ListItemIcon>
                        <ListItemText primary={'Products'} />
                    </ListItem>
                    <ListItem button  onClick={() => {
                        this.toggleDrawer(false)
                        this.props.history.push(`/categories`)
                    }}>
                        <ListItemIcon><CategoryIcon/></ListItemIcon>
                        <ListItemText primary={'Categories'} />
                    </ListItem>
                   
                   
                    <ListItem button  onClick={() => {
                        this.props.history.push(`/customers`)
                    }}>
                        <ListItemIcon><GroupAddIcon/></ListItemIcon>
                        <ListItemText primary={'Customers'} />
                    </ListItem>
                </List>
             </Drawer>
             <div className="logo">
                <MenuIcon onClick={() => this.toggleDrawer(true)}/>
                <Link to="/businesses"><h3>Billing</h3></Link>
             </div>
             </>
             :
             <div className="logo">
                <Link to="/"><h3>Billing</h3></Link>
            </div>
            }
            
            <div className="headerLinks">
                {
                    this.props.user.isLoggedIn ? 
                    <div className="headerLinks">
                    <Link to ="/">Details</Link>
                    <Link to ="/user">Settings</Link>
                    <Link to ="/" onClick={() => {this.props.dispatch(startPostUserLogout())}}>Logout</Link>
                    </div>
                    :
                    <div className="headerLinks">
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                    </div>
                }
            </div>
        </div>
    )
    }
}

const mapStateToProps = (state) => {
    // console.log('props',state.user)
    return {
        user: state.user
    }
}

export default withRouter(connect(mapStateToProps)(Header))