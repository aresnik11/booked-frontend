import React from 'react'
import BookShow from '../components/BookShow'
import AddToBookList from '../components/AddToBookList'
import Error from '../components/Error'
import BookBookLists from '../components/BookBookLists'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import BookListContainer from './BookListContainer'
import withAuth from '../withAuth'

class BookContainer extends React.Component {
    state = {
        searchTerm: "",
    }

    searchBook = (e) => {
        this.setState({
            searchTerm: e.target.value
        })
    }

    render() {
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
                            // look through each booklist (this.props.bookList) and look through books (array) within that to see if our book is there, returns book lists that contain our book
                            // using book.volume_id instead of book.id so that this works for books coming from a book list and a search
                            const wantedBookLists = this.props.bookLists.filter(bookList => bookList.books.find(book => book.volume_id === bookObj.volume_id))
                            return (
                                <div>
                                    <BookShow key={bookObj.id} {...bookObj} />
                                    <AddToBookList book={bookObj} />
                                    <h4>Book lists</h4>
                                    <div>
                                        {wantedBookLists.map(bookList => <BookBookLists key={bookList.id} {...bookList} bookId={bookId} />)}
                                    </div>
                                </div>
                            )
                        }
                        // if we couldn't find the book object, render Error component
                        else {
                            return <Error />
                        }
                    }
                    else {
                        const bookVolumeId = routerProps.match.params.id
                        const searchBookObj = this.props.searchedBooks.find(book => book.volume_id === bookVolumeId)
                        // only render BookShow component if we found the book object
                        if (searchBookObj) {
                            return (
                                <div>
                                    <BookShow key={searchBookObj.volume_id} {...searchBookObj} />
                                    <AddToBookList book={searchBookObj} />
                                    <BookListContainer book={searchBookObj} />
                                </div>
                            )
                        }
                        // if we couldn't find the book object, render Error component
                        else {
                            return <Error />
                        }
                    }
                }}/>
            </Switch>
        )
    }
}

function mapStateToProps(state) {
    return {
        searchedBooks: state.searchBooksReducer.searchedBooks,
        bookLists: state.userReducer.bookLists
    }
}

export default connect(mapStateToProps)(withAuth(BookContainer))