import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Loading from '../components/Loading'
import { pleaseLogIn, removeLogInError } from '../actions/user'

function withAuth(MyComponent) {
    class AuthHOC extends React.Component {
        render() {
            // check if there is a user in state
            if (this.props.currentUser) {
                // if there is a user, render the target component
                return (
                    <MyComponent {...this.props} />
                )
            }
            else {
                // if there isn't, check for a token. its presence indicates that the user is in fact logged in and the fetch from your componentDidMount is still running, so display a loader, otherwise redirect to login page
                if (localStorage.token) {
                    return <Loading />
                }
                else {
                    //pleaseLogIn sets flag in redux store to show a message on Login screen
                    this.props.pleaseLogIn()
                    //removes any previous error messages from invalid logins, since now showing the please login message
                    this.props.removeLogInError()
                    return <Redirect to="/login" />
                }
            }
        }
    }

    function mapStateToProps(state) {
        return {
            currentUser: state.userReducer.currentUser
        }
    }

    return connect(mapStateToProps, { pleaseLogIn, removeLogInError })(AuthHOC)
}

export default withAuth