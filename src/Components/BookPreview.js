import React from 'react'
import { Link } from 'react-router-dom'

const BookPreview = (props) => {
    return (
        <div>
            <Link to={`/books/${props.id}`}>
                <h4>{props.title}</h4>
            </Link>
        </div>
    )
}

export default BookPreview