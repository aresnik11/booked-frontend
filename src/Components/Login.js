import React from 'react'
import { connect } from 'react-redux'
import { setCurrentUser } from '../actions'
import { Form } from 'semantic-ui-react'

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
        .then(response => {
            if (response.errors) {
                alert(response.errors)
            }
            else {
                localStorage.setItem("token", response.token)
                this.props.setCurrentUser(response.user)
                this.props.history.push("/profile")
            }
        })
    }

    render() {
        return (
            <div>
                <h1>Log In</h1>

                {/* will have pleaseLogin key in state if was redirected from withAuth HOC */}
                {this.props.location.state && this.props.location.state.pleaseLogin
                ?
                <h3>Please log in</h3>
                :
                null}

                <Form onSubmit={this.handleSubmit} className="small-input">
                    <Form.Input
                        name="username"
                        placeholder="Username"
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                    <Form.Input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                    <Form.Button basic content="Log In" />
                </Form>
            </div>
        )
    }
}

export default connect(null, { setCurrentUser })(Login)