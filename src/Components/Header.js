import React from 'react'

const Header = (props) => {
    return (
        <div>
            <h1>Booked</h1>
            <h3 onClick={props.logout}>Logout</h3>
        </div>
    )
}

export default Header