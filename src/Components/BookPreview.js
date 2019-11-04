import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { removeBookListBook } from '../actions'

const BookPreview = (props) => {
    return (
        <div>
            {/* if there is a bookListObj prop, link to book with id (from book list) and pass bookListObj in state, otherwise link to book with volume_id (from search) */}
            {props.bookListObj
            ?
            <>
                <Link to={{
                    pathname: `/books/${props.id}`,
                    state: { bookListObj: props.bookListObj }
                }}>
                    <h4>{props.title}</h4>
                </Link>
                <button onClick={() => props.removeBookListBook(props.id, props.bookListObj.id)}>Remove from book list</button>
            </>
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

export default connect(null, { removeBookListBook })(BookPreview)