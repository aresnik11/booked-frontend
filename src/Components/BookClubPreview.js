import React from 'react'
import { Link } from 'react-router-dom'
import Delete from './Delete'

const BookClubPreview = (props) => {
    return (
        <div className="book-club">
            {/* x-button, on click shows confirmation */}
            <Delete type="Book Club" id={props.id} bookClubPreview />
            {/* links to specific book club */}
            <Link to={`/bookclubs/${props.id}`}>
                <div className="book-club-name">
                    <h3>{props.name}</h3>
                </div>
            </Link>
        </div>
    )
}

export default BookClubPreview