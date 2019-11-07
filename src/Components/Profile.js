import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { removeAccount } from '../actions'
import withAuth from '../withAuth'
import { Button } from 'semantic-ui-react'

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
                <Button basic content="Book Lists" />
            </Link>
            <br/><br/>
            <Button basic onClick={handleAccountRemove} content="Delete Account" />
        </div>
    )
}

export default connect(null, { removeAccount })(withAuth(Profile))