import React from 'react'
import { connect } from 'react-redux'
import { logIn, demoLogIn } from '../actions/user'
import { Form, Message, Divider, Button } from 'semantic-ui-react'

class Login extends React.Component {
    state = {
        username: "",
        password: ""
    }

    // controlled log in forrm
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        // send submitted values to the backend and update redux store
        this.props.logIn(this.state)
        .then(() => {
            // if the log in was successful, push to profile page
            if (this.props.currentUser) {
                this.props.history.push("/profile")
            }
        })
    }

    handleDemoClick = () => {
        this.props.demoLogIn()
        .then(() => {
            // if the demo log in was successful, push to profile page
            if (this.props.currentUser) {
                this.props.history.push("/profile")
            }
        })
    }

    render() {
        return (
            <div className="login-container">
                <h1>Log In</h1>

                {/* show please log in message if were redirected from another page */}
                {this.props.pleaseLogIn
                ?
                <>
                    <Message
                        warning
                        className="small-input"
                        header='Please log in'
                        content='Please log in to view other pages'
                    />
                    <br/>
                </>
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
                    {/* only show message if there is an error */}
                    {this.props.logInError
                    ?
                    <Message
                        negative
                        header='Error'
                        content={this.props.logInError}
                    />
                    :
                    null}
                    <Form.Button
                        className="btn"
                        content="Log In"
                    />
                </Form>
                
                {/* demo log in button */}
                <Divider horizontal content="Or" />
                <Button
                    className="btn"
                    content="Demo Log In"
                    onClick={this.handleDemoClick}
                />
                {/* only show message if there is an error */}
                {this.props.demoLogInError
                ?
                <>
                    <br/><br/>
                    <Message
                        className="small-input"
                        negative
                        header='Error'
                        content={this.props.demoLogInError}
                    />
                </>
                :
                null}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.userReducer.currentUser,
        logInError: state.userReducer.logInError,
        pleaseLogIn: state.userReducer.pleaseLogIn,
        demoLogInError: state.userReducer.demoLogInError
    }
}

export default connect(mapStateToProps, { logIn, demoLogIn })(Login)