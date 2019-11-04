import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { removeAccount } from '../actions'
import withAuth from '../withAuth'

const Profile = (props) => {
    const handleAccountRemove = () => {
        const response = window.confirm("Are you sure you want to delete your account?")
        if (response) {
            props.removeAccount()
            localStorage.removeItem("token")
            props.history.push("/signup")
        }
    }

    return (
        <div>
            <h1>Profile page</h1>
            <Link to="/booklists">
                <button>Book Lists</button>
            </Link>
            <br/><br/>
            <button onClick={handleAccountRemove}>Delete account</button>
        </div>
    )
}

export default connect(null, { removeAccount })(withAuth(Profile))