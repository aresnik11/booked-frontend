import React from 'react'
import { connect } from 'react-redux'
import { logIn } from '../actions'
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
        this.props.logIn(this.state)
        .then(() => {
            if (this.props.currentUser) {
                this.props.history.push("/profile")
            }
            else if (this.props.loginError) {
                console.log("error")
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

function mapStateToProps(state) {
    return {
        currentUser: state.userReducer.currentUser,
        loginError: state.userReducer.loginError
    }
}

export default connect(mapStateToProps, { logIn })(Login)