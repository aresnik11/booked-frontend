import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { removeBookList, removeBookListBook } from '../actions'
import { Button, Grid, Card } from 'semantic-ui-react'

const BookListPreview = (props) => {
    const handleBookListRemove = () => {
        const response = window.confirm("Are you sure you want to delete this book list? All books on the book list will also be deleted.")
        if (response) {
            props.removeBookList(props.id)
        }
    }

    const makeBookShelfBooks = () => {
        //book shelf code from https://codepen.io/kzf/pen/vEYVmL
        //if there are books in the booklist, make 6 books
        if (props.books.length) {
            return props.books.slice(0,6).map(book => {
                return (
                    <div key={book.id} className="bl-book bl-book-green">
                        <h2>{book.title}</h2>
                    </div>
                )
            })
        }
        //otherwise, make an empty book so bookshelf renders
        else {
            return (
                <div className="bl-book">
                </div>
            )
        }
    }

    return (
        <Card>
            <Link to={`/booklists/${props.id}`}>
                <Card.Content header={props.name} />
                <Card.Content className="bookshelf" description={makeBookShelfBooks()} />
            </Link>
            <Card.Content extra>
                {/* if there is a bookId prop, remove button should remove this book from the booklist clicked. if not, remove button should remove the booklist */}
                {props.bookId
                ?
                <Button basic onClick={() => props.removeBookListBook(props.bookId, props.id)} content="Remove from Book List" />
                :
                <Button basic onClick={handleBookListRemove} content="Delete Book List" />}
            </Card.Content>
        </Card>
    )
}

export default connect(null, { removeBookList, removeBookListBook })(BookListPreview)