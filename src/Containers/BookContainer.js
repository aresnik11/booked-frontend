import React from 'react'
import BookPreview from '../components/BookPreview'
import BookShow from '../components/BookShow'
import AddToBookList from '../components/AddToBookList'
import Error from '../components/Error'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

const BookContainer = (props) => {
    return (
        <Switch>
            {/* 4 ways the book container gets rendered */}
            <Route path="/books/:id" render={routerProps => {
                const bookId = routerProps.match.params.id
                // going to need another conditional here of where to find the book - won't be searched books if coming from booklist page
                const bookObj = props.searchedBooks.find(book => book.id === bookId)
                // only render BookShow component if we found the book object
                if (bookObj) {
                    return (
                        <div>
                            <BookShow key={bookObj.id} {...bookObj} />
                            <AddToBookList />
                        </div>
                    )
                }
                // if we couldn't find the book object, render Error component
                else {
                    return <Error />
                }
            }}/>
            <Route path="/booklists/:id" render={() => {
                return (
                    <div>
                        <h1>Book Container within Booklist</h1>
                        {/* {props.searchedBooks.map(book => <BookPreview key={book.id} {...book} />)} */}
                    </div>
                )
            }} />
            <Route path="/search" render={() => {
                return (
                    <div>
                        {props.searchedBooks.map(book => <BookPreview key={book.id} {...book} />)}
                    </div>
                )
            }} />
        </Switch>

    )
}

function mapStateToProps(state) {
    return {
        searchedBooks: state.booksReducer.searchedBooks,
    }
}

export default connect(mapStateToProps)(BookContainer)