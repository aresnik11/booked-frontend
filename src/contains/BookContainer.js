import React from 'react'
import BookShow from '../comps/BookShow'
import AddToBookList from '../comps/AddToBookList'
import Loading from '../comps/Loading'
import BookBookLists from '../comps/BookBookLists'
import { connect } from 'react-redux'
import withAuth from '../helpers/withAuth'
import { fetchBook, fetchBookByVolumeId } from '../actions/book'
import { Grid } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'

class BookContainer extends React.Component {
    state = {
        searchTerm: "",
    }

    // controlled search form
    searchBook = (e) => {
        this.setState({
            searchTerm: e.target.value
        })
    }

    componentDidMount() {
        const bookId = this.props.match.params.id
        // if we came from search, need to fetch book via volume id
        if (this.props.location.state && this.props.location.state.fromSearch) {
            this.props.fetchBookByVolumeId(bookId)
        }
        // otherwise can fetch the book normally
        else {
            this.props.fetchBook(bookId)
        }
    }

    render() {
        // if selectedBook in props is not null (default), then we may have a book
        if (this.props.selectedBook) {
            // if selectedBook has an id, then we found the book in the backend and can render it
            if (this.props.selectedBook.id) {
                const book = this.props.selectedBook
                // finding the users booklists that this book is on
                const wantedBookLists = this.props.bookLists.filter(bookList => bookList.books.find(bookListBook => bookListBook.id === book.id))
                return (
                    <div className="book-show-container">
                        <Grid>
                            <Grid.Row>
                                <Grid.Column>
                                    <div className="book-show title">
                                        <h1>{book.title}</h1>
                                        {book.subtitle ? <h2>{book.subtitle}</h2> : null}
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                {/* bookShow contains 2 grid columns with image, info, and description */}
                                <BookShow key={book.id} {...book} />
                                <Grid.Column width={5}>
                                    <div className="book-show content">
                                        <AddToBookList book={book} />
                                        {/* only render Book Lists section if this book is on any of the users book lists */}
                                        {wantedBookLists.length
                                        ?
                                        <>
                                            <br/>
                                            <h2>Book lists</h2>
                                            <div>
                                                {wantedBookLists.map(bookList => <BookBookLists key={bookList.id} {...bookList} bookId={book.id} />)}
                                            </div>
                                        </>
                                        :
                                        null}
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>
                )
            }
            // if selectedBook doesn't have an id, we couldn't find it in our backend and need to look for it in the array of searchedBooks
            else {
                const book = this.props.searchedBooks.find(book => book.volume_id === this.props.match.params.id)
                // if we found the book in the searchedBooks array, render it
                if (book) {
                    let bookId
                    // finding the users booklists that this book is on
                    // keeping track of the book id if we find the book on a booklist since we only have volume_id from a search
                    const wantedBookLists = this.props.bookLists.filter(bookList => bookList.books.find(bookListBook => {
                        if (bookListBook.volume_id === book.volume_id) {
                            bookId = bookListBook.id
                            return bookListBook
                        }
                        return false
                    }))
                    return (
                        <div className="book-show-container">
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column>
                                        <div className="book-show title">
                                            <h1>{book.title}</h1>
                                            {book.subtitle ? <h2>{book.subtitle}</h2> : null}
                                        </div>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    {/* bookShow contains 2 grid columns with image, info, and description */}
                                    <BookShow key={book.volume_id} {...book} />
                                    <Grid.Column width={5}>
                                        <div className="book-show content">
                                            <AddToBookList book={book} />
                                            {/* only render Book Lists section if this book is on any of the users book lists */}
                                            {wantedBookLists.length
                                            ?
                                            <>
                                                <br/>
                                                <h2>Book lists</h2>
                                                <div>
                                                    {wantedBookLists.map(bookList => <BookBookLists key={bookList.id} {...bookList} bookId={bookId} />)}
                                                </div>
                                            </>
                                            :
                                            null}
                                        </div>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </div>
                    )
                }
                //otherwise, we don't know that the book is so redirect to /error, which will render the Error component
                else {
                    return <Redirect to="/error" />
                }
            }
        }
        //if selectedBook is null, that is the default value, so we should show the loading component
        else {
            return <Loading />
        }
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