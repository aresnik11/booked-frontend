import React from 'react'
import { connect } from 'react-redux'

class Login extends React.Component {
    state = {
        username: "",
        password: ""
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        fetch("http://localhost:3001/api/v1/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({user: this.state})
        })
        .then(resp => resp.json())
        .then(response => this.props.setUser(response))
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Login</label>
                <br/>
                <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange} />
                <br/>
                <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                <br/><br/>
                <input type="submit" value="Log In" />
            </form>
        )
    }
}

export default Login