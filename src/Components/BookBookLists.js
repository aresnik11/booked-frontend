import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { removeBookListBook } from '../actions'
import { Button } from 'semantic-ui-react'

const BookBookLists = (props) => {
    return (
        <div>
            <Link to={`/booklists/${props.id}`}>
                <h3>{props.name}</h3>
            </Link>
            <Button basic onClick={() => props.removeBookListBook(props.bookId, props.id)} content="Remove from Book List" />
            <br/><br/>
        </div>
    )
}

export default connect(null, { removeBookListBook })(BookBookLists)