import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { removeBookListBook } from '../actions/bookList'
import { Icon } from 'semantic-ui-react'

const BookBookLists = (props) => {
    return (
        <div>
            {/* links to specific book list */}
            <Link to={`/booklists/${props.id}`}>
                <h3 className="book-bl-name">{props.name}</h3>
            </Link>
            &nbsp;&nbsp;&nbsp;
            {/* x-button removes book from book list */}
            <Icon
                className="x"
                onClick={() => props.removeBookListBook(props.bookId, props.id)}
            />
            <br/><br/>
        </div>
    )
}

export default connect(null, { removeBookListBook })(BookBookLists)