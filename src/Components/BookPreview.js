import React from 'react'
import { Link } from 'react-router-dom'

const BookPreview = (props) => {
    return (
        <div>
            {/* if there is a search prop, link to book with volume_id (from search), otherwise link to book with id (from book list) */}
            {/* <Link to={props.search ? `/books/${props.volume_id}` : `/books/${props.id}`}>
                <h4>{props.title}</h4>
            </Link> */}
            {props.bookListObj
            ?
            <Link to={{
                pathname: `/books/${props.id}`,
                state: { bookListObj: props.bookListObj }
            }}>
                <h4>{props.title}</h4>
            </Link>
            :
            <Link to={{
                pathname: `/books/${props.volume_id}`,
                state: { fromSearch: true }
            }}>
                <h4>{props.title}</h4>
            </Link>
            }
        </div>
    )
}

export default BookPreview