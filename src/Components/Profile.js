import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { removeAccount } from '../actions'
import withAuth from './withAuth'
import { Button, Confirm } from 'semantic-ui-react'

class Profile extends React.Component {
    state = {
        open: false
    }

    // shows confirmation modal
    showConfirmation = () => {
        this.setState({
            open: true
        })
    }

    // closes modal on click on cancel in confirmation modal
    handleCancel = () => {
        this.setState({
            open: false
        })
    }

    // deletes account and removes token from localStorage on click in confirmation modal
    handleAccountRemove = () => {
        this.props.removeAccount()
        localStorage.removeItem("token")
    }

    render() {
        return (
            <div>
                <h1>Welcome, {this.props.currentUser.username}</h1>
                <br/>
                <Link to="/booklists">
                    <Button
                        color="black"
                        content="My Book Lists"
                    />
                </Link>
                <br/><br/>
                <Link to="/search">
                    <Button
                        color="black"
                        content="Search Books"
                    />
                </Link>
                <br/><br/>
                <Link to="/bookclubs">
                    <Button
                        color="black"
                        content="See Book Clubs"
                    />
                </Link>
                <br/><br/>
                <Button
                    color="black"
                    onClick={this.showConfirmation}
                    content="Delete Account"
                />
                {/* confirmation modal, hidden until click on delete account */}
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