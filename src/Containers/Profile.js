import React from 'react'
import { Link } from 'react-router-dom'

const Profile = () => {
    return (
        <div>
            <h1>Profile page</h1>
            <Link to="/booklists">
                <button>Book List</button>
            </Link>
            <br/><br/>
            <button>Delete account</button>
        </div>
    )
}

export default Profile