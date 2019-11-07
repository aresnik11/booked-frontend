import React from 'react'
import { connect } from 'react-redux'
import { removeBookList } from '../actions'
import { Button } from 'semantic-ui-react'

const BookListShow = (props) => {
    const handleBookListRemove = () => {
        const response = window.confirm("Are you sure you want to delete this book list? All books on the book list will also be deleted.")
        if (response) {
            props.removeBookList(props.id)
            props.history.push("/booklists")
        }
    }

    return (
        <div>
            <h1>{props.name}</h1>
            <Button basic onClick={handleBookListRemove} content="Delete Book List" />
        </div>
    )
}

export default connect(null, { removeBookList })(BookListShow)