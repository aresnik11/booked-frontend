import React from 'react'
import BookShow from '../components/BookShow'
import AddToBookList from '../components/AddToBookList'
import Loading from '../components/Loading'
import BookBookLists from '../components/BookBookLists'
import { connect } from 'react-redux'
import withAuth from '../withAuth'
import { fetchBook, fetchBookByVolumeId } from '../actions'
import { Grid, Image, Segment } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'

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
                    <div className="book-show-container">
                        <Grid >
                            <Grid.Row>
                                <Grid.Column className="book-show-title">
                                    <h1>{book.title}</h1>
                                    {book.subtitle ? <h3>{book.subtitle}</h3> : null}
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={3}>
                                    <div className="book-show">
                                        <Image alt={book.title} src={book.image} className="image-show" />
                                    </div>
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <BookShow key={book.id} {...book} />
                                </Grid.Column>
                                <Grid.Column width={5}>
                                    <div className="book-show">
                                        <p>{book.description}</p>
                                    </div>
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <div className="book-show">
                                        <AddToBookList book={book} />
                                    </div>
                                    {/* only render Book Lists section if this book is on any of the users book lists */}
                                    {wantedBookLists.length
                                    ?
                                    <>
                                        <br/><br/>
                                        <div className="book-show">
                                            <h3>Book lists</h3>
                                            <div>
                                                {wantedBookLists.map(bookList => <BookBookLists key={bookList.id} {...bookList} bookId={book.id} />)}
                                            </div>
                                        </div>
                                    </>
                                    :
                                    null}
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>

                        // {/* <BookShow key={book.id} {...book} />
                        // <br/><br/>
                        // <AddToBookList book={book} /> */}
                        // {/* only render Book Lists header if this book is on any of the users book lists */}
                        // {/* {wantedBookLists.length ? <h4>Book lists</h4> : null}
                        // <div>
                        //     {wantedBookLists.map(bookList => <BookBookLists key={bookList.id} {...bookList} bookId={book.id} />)}
                        // </div> */}
                )
            }
            //if selectedBook doesn't have an id, we couldn't find it in our backend and need to look for it in the array of searchedBooks
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
                        <div className="book-show-container">
                            <Grid columns='equal' className="book-show">
                                <Grid.Row>
                                    <Grid.Column>
                                        <h1>{book.title}</h1>
                                        {book.subtitle ? <h3>{book.subtitle}</h3> : null}
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column width={2}>
                                        <div>
                                            <Image alt={book.title} src={book.image} className="image-show" />
                                        </div>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <BookShow key={book.volume_id} {...book} />
                                    </Grid.Column>
                                    <Grid.Column>
                                        <div>
                                            <p>{book.description}</p>
                                        </div>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <div>
                                            <AddToBookList book={book} />
                                        </div>
                                        <br/><br/>
                                        <div>
                                            {/* only render Book Lists header if this book is on any of the users book lists */}
                                            {wantedBookLists.length ? <h3>Book lists</h3> : null}
                                            <div>
                                                {wantedBookLists.map(bookList => <BookBookLists key={bookList.id} {...bookList} bookId={bookId} />)}
                                            </div>
                                        </div>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </div>
                        // <div>
                        //     <BookShow key={book.volume_id} {...book} />
                        //     <AddToBookList book={book} />
                        //     {/* only render Book Lists header if this book is on any of the users book lists */}
                        //     {wantedBookLists.length ? <h4>Book lists</h4> : null}
                        //     <div>
                        //         {wantedBookLists.map(bookList => <BookBookLists key={bookList.id} {...bookList} bookId={bookId} />)}
                        //     </div>                                
                        // </div>
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