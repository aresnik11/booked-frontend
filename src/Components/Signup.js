import React from 'react'
import { connect } from 'react-redux'
import { Form, Message } from 'semantic-ui-react'
import { signUp } from '../actions'

class Signup extends React.Component {
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
        this.props.signUp(this.state)
        .then(() => {
            if (this.props.currentUser) {
                this.props.history.push("/profile")
            }
        })
    }

    render() {
        return (
            <div>
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
                    {this.props.signUpError
                    ?
                    <Message
                        negative
                        header='Error'
                        list={this.props.signUpError}
                    />
                    :
                    null}
                    <Form.Button basic content="Sign Up" />
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