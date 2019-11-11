import React from 'react'
import BookShow from '../components/BookShow'
import AddToBookList from '../components/AddToBookList'
import Loading from '../components/Loading'
import Error from '../components/Error'
import BookBookLists from '../components/BookBookLists'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import withAuth from '../withAuth'
import { fetchBook, fetchBookByVolumeId } from '../actions'

class BookContainer extends React.Component {
    state = {
        searchTerm: "",
    }

    searchBook = (e) => {
        this.setState({
            searchTerm: e.target.value
        })
    }

    componentDidMount() {
        const bookId = this.props.match.params.id
        //if we came from search, need to fetch book via volume id
        if (this.props.location.state && this.props.location.state.fromSearch) {
            this.props.fetchBookByVolumeId(bookId)
        }
        //otherwise can fetch the book normally
        else {
            this.props.fetchBook(bookId)
        }
    }

    render() {
        //if selectedBook in props is not null (default), then we may have a book
        if (this.props.selectedBook) {
            //if selectedBook has an id, then we found the book in the backend and can render it
            if (this.props.selectedBook.id) {
                const book = this.props.selectedBook
                //finding the users booklists that this book is on
                const wantedBookLists = this.props.bookLists.filter(bookList => bookList.books.find(bookListBook => bookListBook.id === book.id))
                return (
                    <div>
                        <BookShow key={book.id} {...book} />
                            <AddToBookList book={book} />
                            {/* only render Book Lists header if this book is on any of the users book lists */}
                            {wantedBookLists.length ? <h4>Book lists</h4> : null}
                            <div>
                                {wantedBookLists.map(bookList => <BookBookLists key={bookList.id} {...bookList} bookId={book.id} />)}
                            </div>
                    </div>
                )
            }
            //if selectedBook doesn't have an id, we only got back the volume_id and need to look for it in the array of searchedBooks
            else {
                // const book = this.props.searchedBooks.find(book => book.volume_id === this.props.selectedBook.volume_id)
                const book = this.props.searchedBooks.find(book => book.volume_id === this.props.match.params.id)
                //if we found the book in the searchedBooks array, render it
                if (book) {
                    let bookId
                    //finding the users booklists that this book is on
                    //keeping track of the book id if we find the book on a booklist since we only have volume_id from a search
                    const wantedBookLists = this.props.bookLists.filter(bookList => bookList.books.find(bookListBook => {
                        if (bookListBook.volume_id === book.volume_id) {
                            bookId = bookListBook.id
                            return bookListBook
                        }
                        return false
                    }))
                    return (
                        <div>
                            <BookShow key={book.volume_id} {...book} />
                            <AddToBookList book={book} />
                            {/* only render Book Lists header if this book is on any of the users book lists */}
                            {wantedBookLists.length ? <h4>Book lists</h4> : null}
                            <div>
                                {wantedBookLists.map(bookList => <BookBookLists key={bookList.id} {...bookList} bookId={bookId} />)}
                            </div>                                
                        </div>
                    )
                }
                //otherwise, we don't know that the book is so render error component
                //otherwise, we don't know what the book is so redirect back to the search page
                else {
                    return <Error />
                    // return <Redirect to="/search" />
                }
            }
        }
        //if selectedBook is null, that is the default value, so we should show the loading component
        else {
            return <Loading />
        }
        // return (
        //     <Switch>
        //         <Route path="/books/:id" render={routerProps => {
        //             // const bookId = routerProps.match.params.id
        //             // if we came from a booklist show page, bookListId will be in state of routerProps
        //             const bookListId = routerProps.location.state.bookListId
        //             if (bookListId) {
        //                 const bookId = parseInt(routerProps.match.params.id)
        //                 // needs to look through all of the booklists, not just the bookListObj we came from - if you remove book from that book list, get error
        //                 // const bookObj = bookListObj.books.find(book => book.id === bookId)
        //                 let bookObj
        //                 const wantedBookLists = this.props.bookLists.filter(bookList => bookList.books.find(book => {
        //                     if (book.id === bookId) {
        //                         bookObj = book
        //                         return book
        //                     }
        //                     return false
        //                 }))
        //                 // only render BookShow component if we found the book object
        //                 if (bookObj) {
        //                     // look through each booklist (this.props.bookList) and look through books (array) within that to see if our book is there, returns book lists that contain our book
        //                     // using book.volume_id instead of book.id so that this works for books coming from a book list and a search
        //                     // const wantedBookLists = this.props.bookLists.filter(bookList => bookList.books.find(book => book.volume_id === bookObj.volume_id))
        //                     return (
        //                         <div>
        //                             <BookShow key={bookObj.id} {...bookObj} />
        //                             <AddToBookList book={bookObj} />
        //                             <h4>Book lists</h4>
        //                             <div>
        //                                 {wantedBookLists.map(bookList => <BookBookLists key={bookList.id} {...bookList} bookId={bookId} />)}
        //                             </div>
        //                         </div>
        //                     )
        //                 }
        //                 // if we couldn't find the book object, render Error component
        //                 else {
        //                     return <Error />
        //                 }
        //             }
        //             else {
        //                 const bookVolumeId = routerProps.match.params.id
        //                 const searchBookObj = this.props.searchedBooks.find(book => book.volume_id === bookVolumeId)
        //                 // only render BookShow component if we found the book object
        //                 if (searchBookObj) {
        //                     // look through each booklist (this.props.bookList) and look through books (array) within that to see if our book is there, returns book lists that contain our book
        //                     // using book.volume_id instead of book.id so that this works for books coming from a book list and a search
        //                     const wantedBookLists = this.props.bookLists.filter(bookList => bookList.books.find(book => book.volume_id === searchBookObj.volume_id))
        //                     return (
        //                         <div>
        //                             <BookShow key={searchBookObj.volume_id} {...searchBookObj} />
        //                             <AddToBookList book={searchBookObj} />
        //                             <div>
        //                                 {/* needs to be book id, not bookVolumeId */}
        //                                 {wantedBookLists.map(bookList => <BookBookLists key={bookList.id} {...bookList} bookId={bookVolumeId} />)}
        //                             </div>                                
        //                         </div>
        //                     )
        //                 }
        //                 // if we couldn't find the book object, render Error component
        //                 else {
        //                     return <Error />
        //                 }
        //             }
        //         }}/>
        //     </Switch>
        // )
    }
}

function mapStateToProps(state) {
    return {
        searchedBooks: state.bookReducer.searchedBooks,
        selectedBook: state.bookReducer.selectedBook,
        bookLists: state.bookListReducer.bookLists
    }
}

export default connect(mapStateToProps, { fetchBook, fetchBookByVolumeId })(withAuth(BookContainer))