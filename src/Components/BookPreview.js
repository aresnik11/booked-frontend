import React from 'react'
import { Route, Link } from 'react-router-dom'

const BookPreview = (props) => {
    return (
        <div>
            <Link to={`/books/${props.id}`}>
                <h4>Book preview: {props.title}</h4>
            </Link>
        </div>
    )
}

export default BookPreview