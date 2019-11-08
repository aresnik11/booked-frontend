import React from 'react'
import { connect } from 'react-redux'
import { removeBookList, removeBookClub } from '../actions'
import { Button } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

const BookListClubShow = (props) => {
    const handleRemove = () => {
        if (props.type === "Book List") {
            const response = window.confirm("Are you sure you want to delete this book list? All books on the book list will also be deleted.")
            if (response) {
                props.removeBookList(props.id)
                props.history.push("/booklists")
            }
        }
        else if (props.type === "Book Club") {
            const response = window.confirm("Are you sure you want to delete this book club? All messages within the book club will also be deleted.")
            if (response) {
                props.removeBookClub(props.id)
                props.history.push("/bookclubs")
            }
        }
    }

    const content = `Delete ${props.type}`

    return (
        <div>
            <h1>{props.name}</h1>
            <Button basic onClick={handleRemove} content={content} />
        </div>
    )
}

export default connect(null, { removeBookList, removeBookClub })(withRouter(BookListClubShow))