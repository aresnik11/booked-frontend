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
            <Route path="/books/:id" render={routerProps => {
                // if we came from a booklist show page, bookListObj will be in state of routerProps
                const bookListObj = routerProps.location.state.bookListObj
                if (bookListObj) {
                    const bookId = parseInt(routerProps.match.params.id)
                    const bookObj = bookListObj.books.find(book => book.id === bookId)
                    // only render BookShow component if we found the book object
                    if (bookObj) {
                        return (
                            <div>
                                <BookShow key={bookObj.id} {...bookObj} />
                                {/* <AddToBookList book={bookObj} /> */}
                            </div>
                        )
                    }
                    // if we couldn't find the book object, render Error component
                    else {
                        return <Error />
                    }
                }
                // if we came from the search page, book id will be string of letters that becomes NaN when parseInt-ed
                else {
                    const bookVolumeId = routerProps.match.params.id
                    const searchBookObj = props.searchedBooks.find(book => book.volume_id === bookVolumeId)
                    // only render BookShow component if we found the book object
                    if (searchBookObj) {
                        return (
                            <div>
                                <BookShow key={searchBookObj.volume_id} {...searchBookObj} />
                                <AddToBookList book={searchBookObj} />
                            </div>
                        )
                    }
                    // if we couldn't find the book object, render Error component
                    else {
                        return <Error />
                    }
                }

            }}/>
            <Route path="/booklists/:id" render={() => {
                return (
                    <div>
                        <h3>Books on this book list:</h3>
                        {/* passing books for this booklist in props from BookListContainer component */}
                        {props.bookListObj.books.map(book => <BookPreview key={book.id} {...book} bookListObj={props.bookListObj} />)}
                    </div>
                )
            }} />
            <Route path="/search" render={() => {
                return (
                    <div>
                        {props.searchedBooks.map(book => <BookPreview key={book.volume_id} {...book} />)}
                    </div>
                )
            }} />
        </Switch>

    )
}

function mapStateToProps(state) {
    return {
        searchedBooks: state.booksReducer.searchedBooks,
        bookLists: state.userReducer.bookLists
    }
}

export default connect(mapStateToProps)(BookContainer)