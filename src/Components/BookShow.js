import React from 'react'

const BookShow = (props) => {
    return (
        <div className="book-show">
            {props.author ? <h3>Written by {props.author}</h3> : null}
            {props.publisher ? <h3>Published by {props.publisher}</h3> : null}
            {props.published_date ? <h3>Published on {props.published_date}</h3> : null}
            {props.page_count ? <h3>{props.page_count} pages</h3> : null}
            {props.average_rating ? <h3>Average rating: {props.average_rating}</h3> : null}
        </div>
    )
}

export default BookShow