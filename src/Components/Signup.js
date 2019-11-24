import React from 'react'
import { connect } from 'react-redux'
import { Form, Message } from 'semantic-ui-react'
import { signUp } from '../actions'

class Signup extends React.Component {
    state = {
        username: "",
        password: ""
    }

    // controlled sign up form
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        // send submitted values to the backend and update redux store
        this.props.signUp(this.state)
        .then(() => {
            // if the sign up was successful, push to profile page
            if (this.props.currentUser) {
                this.props.history.push("/profile")
            }
        })
    }

    render() {
        return (
            <div className="login-container">
                <h1>Sign Up</h1>
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
                    {/* only show message if there is an error */}
                    {this.props.signUpError
                    ?
                    <Message
                        negative
                        header='Error'
                        list={this.props.signUpError}
                    />
                    :
                    null}
                    <Form.Button
                        className="btn"
                        content="Sign Up"
                    />
                </Form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.userReducer.currentUser,
        signUpError: state.userReducer.signUpError
    }
}

export default connect(mapStateToProps, { signUp })(Signup)