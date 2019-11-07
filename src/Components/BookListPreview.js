import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { removeBookList, removeBookListBook } from '../actions'
import { Button, Card } from 'semantic-ui-react'

const BookListPreview = (props) => {
    const handleBookListRemove = () => {
        const response = window.confirm("Are you sure you want to delete this book list? All books on the book list will also be deleted.")
        if (response) {
            props.removeBookList(props.id)
        }
    }

    //returns a random number between 0 and n
    const getRandomNumber = (n) => {
        return Math.floor(Math.random() * n)
    }

    //randomizes class names so books on book shelf have different colors by random
    const getRandomColorClassName = () => {
        const classNameArray = ["bl-book bl-book-grey", "bl-book bl-book-blue", "bl-book bl-book-dark-grey", "bl-book bl-book-light-blue"]
        return classNameArray[getRandomNumber(classNameArray.length)]
    }

    const makeBookShelfBooks = () => {
        //book shelf code from https://codepen.io/kzf/pen/vEYVmL
        //if there are books in the booklist, make 5 books
        if (props.books.length) {
            const randomNum = getRandomNumber(5)
            return props.books.slice(0,5).map((book, index) => {
                //if this index matches our random number, make a tilted book with a random color and only show first 53 chars of title
                if (index === randomNum) {
                    return (
                        <div key={book.id} className="bl-book-tilted">
                            <div className={getRandomColorClassName()}>
                                <h2>{book.title.slice(0,53)}</h2>
                            </div>
                        </div>
                    )
                }
                //otherwise make a regular book with a random color and only show first 53 chars of title
                else {
                    return (
                        <div key={book.id} className={getRandomColorClassName()}>
                            <h2>{book.title.slice(0,53)}</h2>
                        </div>
                    )
                }
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