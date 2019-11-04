import React from 'react'

const BookShow = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            <h3>{props.subtitle ? props.subtitle : null}</h3>
            <h3>{props.author}</h3>
            <h3>Average rating: {props.average_rating}</h3>
            <h3>{props.page_count} pages</h3>
            <h3>Published on {props.published_date}</h3>
            <h3>Published by {props.publisher}</h3>
            <h3>{props.url}</h3>
            <img alt={props.title} src={props.image} />
            <p>{props.description}</p>
        </div>
    )
}

export default BookShow