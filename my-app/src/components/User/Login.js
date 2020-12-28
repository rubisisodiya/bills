import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import {connect} from 'react-redux'
import {startPostUserLogin} from '../../actions/user'

class Login extends React.Component {

    constructor() {
      super()
      this.state = {
        username: '',
        password: ''
      }
    }

    componentDidUpdate() {
      if (this.props.user.isLoggedIn && !this.props.user.notice) {
        this.props.history.push('/')
      }
    }

    handleChange = (e) => {
      this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
          username: this.state.username,
          password: this.state.password
        }
        this.setState({username: '', password: ''})
        this.props.dispatch(startPostUserLogin(formData, this.props.history))
    }

    render(){
        return (
            <>
              <div className="loginPanel">
                  
                <form onSubmit={this.handleSubmit}>
                  <h3>LOGIN</h3>
                  <TextField size="small" name="username" value={this.state.username} onChange={this.handleChange} label="username/email"/>
                  <TextField size="small" name="password" type="password" value={this.state.password} onChange={this.handleChange} label="password"/>
                  <Button 
                    size="small" 
                    type="submit" 
                  >
                    Sign in
                  </Button>
                </form>
                  <div>
                    {/* <Link to="/forgot-password">Forgot Password</Link> */}
                    .{this.props.user.notice}
                  </div>
              </div>
              
            </>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Login)