import React from 'react'
import BookContainer from './BookContainer'
import { Route, Switch } from 'react-router-dom'

const BookListContainer = (props) => {
    return (
        <div>
            <h1>I'm the book list container</h1>
            <Switch>
                <Route path="/booklists/:id" render={() => {
                    return (
                        <div>
                            <h1>Book List Page</h1>
                            {/* {props.searchedBooks.map(book => <BookPreview key={book.id} {...book} />)} */}
                        </div>
                    )
                }} />
                <Route path="/booklists" render={() => {
                    return (
                        <div>
                            <h1>Book Container within Booklist</h1>
                            <BookContainer />
                            {/* {props.searchedBooks.map(book => <BookPreview key={book.id} {...book} />)} */}
                        </div>
                    )
                }} />
            </Switch>

            {/* <BookContainer /> */}
        </div>
    )
}

export default BookListContainer