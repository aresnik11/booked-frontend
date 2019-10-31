import React from 'react'
import BookListContainer from './BookListContainer'
import { Link } from 'react-router-dom'

const Profile = () => {
    return (
        <div>
            <h1>Profile page</h1>
            <Link to="/booklists">
                <button>Book List</button>
            </Link>
            {/* <BookListContainer /> */}
        </div>
    )
}

export default Profile