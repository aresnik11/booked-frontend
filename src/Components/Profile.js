import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { removeAccount } from '../actions'
import withAuth from '../withAuth'
import { Button, Confirm } from 'semantic-ui-react'

class Profile extends React.Component {
    state = {
        open: false
    }

    showConfirmation = () => {
        this.setState({
            open: true
        })
    }

    handleCancel = () => {
        this.setState({
            open: false
        })
    }

    handleAccountRemove = () => {
        this.props.removeAccount()
        localStorage.removeItem("token")
        this.props.history.push("/signup")
    }

    render() {
        return (
            <div>
                <h1>Welcome, {this.props.currentUser.username}</h1>
                <Link to="/booklists">
                    <Button content="Book Lists" />
                </Link>
                <br/><br/>
                <Button onClick={this.showConfirmation} content="Delete Account" />
                <Confirm
                    open={this.state.open}
                    header="Please Confirm"
                    content="Are you sure you want to delete your account?"
                    confirmButton="Delete"
                    onCancel={this.handleCancel}
                    onConfirm={this.handleAccountRemove}
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.userReducer.currentUser
    }
}

export default connect(mapStateToProps, { removeAccount })(withAuth(Profile))