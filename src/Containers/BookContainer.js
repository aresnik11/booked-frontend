import React from 'react'
import Book from '../Components/Book'

const BookContainer = (props) => {
    return (
        <div>
            <h1>Book Container</h1>
            {props.books.map(book => <Book key={book.id} {...book} />)}
        </div>
    )
}

export default BookContainer