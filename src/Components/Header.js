import React from 'react'
import { connect } from 'react-redux'
import { logOut } from '../actions'

const Header = (props) => {
    const handleLogOut = () => {
        props.logOut()
        localStorage.removeItem("token")
        props.history.push("/login")
    }
    return (
        <div>
            <h1>Booked</h1>
            <h3 onClick={handleLogOut}>Logout</h3>
        </div>
    )
}

export default connect(null, { logOut })(Header)