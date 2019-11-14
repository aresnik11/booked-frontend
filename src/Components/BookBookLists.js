import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { removeBookListBook } from '../actions'
import { Label } from 'semantic-ui-react'

const BookBookLists = (props) => {
    return (
        <div>
            <Link to={`/booklists/${props.id}`}>
                <h3 className="book-bl-name">{props.name}</h3>
            </Link>
            &nbsp;&nbsp;&nbsp;
            <Label as="button" className="btn" content="X" size="tiny" onClick={() => props.removeBookListBook(props.bookId, props.id)} />
            <br/><br/>
        </div>
    )
}

export default connect(null, { removeBookListBook })(BookBookLists)