import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { removeBookList, removeBookListBook } from '../actions'

const BookListPreview = (props) => {
    const handleBookListRemove = () => {
        const response = window.confirm("Are you sure you want to delete this book list? All books on the book list will also be deleted.")
        if (response) {
            props.removeBookList(props.id)
        }
    }

    return (
        <div>
            <Link to={`/booklists/${props.id}`}>
                <h4>{props.name}</h4>
            </Link>
            {/* if there is a bookId prop, remove button should remove this book from the booklist clicked. if not, remove button should remove the booklist */}
            {props.bookId
            ?
            <button onClick={() => props.removeBookListBook(props.bookId, props.id)}>Remove from book list</button>
            :
            <button onClick={handleBookListRemove}>Remove book list</button>}
        </div>
    )
}

export default connect(null, { removeBookList, removeBookListBook })(BookListPreview)