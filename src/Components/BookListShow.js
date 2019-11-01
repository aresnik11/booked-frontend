import React from 'react'
import { Link } from 'react-router-dom'

const BookListShow = (props) => {
    return (
        <div>
            <Link to={`/booklists/${props.id}`}>
                <h4>{props.name}</h4>
            </Link>
        </div>
    )
}

export default BookListShow