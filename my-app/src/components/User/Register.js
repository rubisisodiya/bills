import React from 'react'
import {Link} from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import axios from  '../../config/axios'

class Register extends React.Component {
  constructor(props){
    super(props)
    this.state={
      username: '',
      password: '',
      email: '',
      phone: ''
    }
  }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
          phone: this.state.phone
        }
        axios.post('/users/register',formData)
        .then(user=>{
          this.setState({username: '', password: '',email: '',phone: ''})
        })
        .catch(err=>{
          console.log(err)
        })
    }
    handleChange = (e) => {
      this.setState({[e.target.name]: e.target.value})
    }

    render(){
        return (
            <>
              <div className="loginPanel">
                  
                <form onSubmit={this.handleSubmit}>
                  <h3>Register</h3>
                  <TextField size="small" label="username" name="username" value={this.state.username} onChange={this.handleChange}/>
                  <TextField size="small" label="email" type="email" name="email" value={this.state.email} onChange={this.handleChange}/>
                  <TextField size="small" label="phone" name="phone" value={this.state.phone} onChange={this.handleChange}/>
                  <TextField size="small" type="password" label="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                  <Button 
                    size="small" 
                    type="submit" 
                  >
                    Sign up
                  </Button>
                </form>
                  <div>
                    <Link to="/login">Already a member? Sign in.</Link>
                  </div>
              </div>
              
            </>
        )
    }
}

export default Register