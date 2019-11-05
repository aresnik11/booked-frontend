import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Loading from './components/Loading'

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
                    return (
                        <Redirect to={{
                            pathname: "/login",
                            state: { pleaseLogin: true }
                        }} />
                    )
                }
            }
        }
    }

    function mapStateToProps(state) {
        return {
            currentUser: state.userReducer.currentUser
        }
    }

    return connect(mapStateToProps)(AuthHOC)
}

export default withAuth