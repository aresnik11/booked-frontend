import React from 'react'
import BookContainer from './BookContainer'
import BookListPreview from '../components/BookListPreview'
import NewBookList from '../components/NewBookList'
import BookListShow from '../components/BookListShow'
import Search from '../components/Search'
import Error from '../components/Error'
import ShareBookList from '../components/ShareBookList'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import withAuth from '../withAuth'
import { Grid, Card, Segment } from 'semantic-ui-react'

class BookListContainer extends React.Component {
    state = {
        searchTerm: ""
    }

    searchBookList = (e) => {
        this.setState({
            searchTerm: e.target.value
        })
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route path="/booklists/:id" render={(routerProps) => {
                        //find the booklist that matches this id from this users booklists
                        const bookListId = parseInt(routerProps.match.params.id)
                        const bookListObj = this.props.bookLists.find(bookList => bookList.id === bookListId)
                        // only render BookContainer component if we found the book list object
                        if (bookListObj) {
                            return (
                                <div>
                                    <BookListShow {...bookListObj} {...routerProps} />
                                    <br/><br/>
                                    <ShareBookList {...bookListObj} />
                                    <br/><br/>
                                    <BookContainer bookListObj={bookListObj} />
                                </div>
                            )
                        }
                        // if we couldn't find the book list object, render Error component
                        else {
                            return <Error />
                        }
                    }} />
                    <Route path="/booklists" render={() => {
                        const filteredBookLists = this.props.bookLists.filter(bookList => bookList.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
                        return (
                            <div>
                                <h1>My Book Lists</h1>
                                <br/>
                                <NewBookList />
                                <br/><br/>
                                <Search type="Book Lists" searchTerm={this.state.searchTerm} searchHandler={this.searchBookList} />
                                <br/><br/>
                                <Card.Group centered>
                                    {filteredBookLists.map(bookList => <BookListPreview key={bookList.id} {...bookList} />)}
                                </Card.Group>
                            </div>
                        )
                    }} />
                    <Route path="/books/:id" render={() => {
                        // look through each booklist (this.props.bookList) and look through books (array) within that to see if our book is there, returns book lists that contain our book
                        // using book.volume_id instead of book.id so that this works for books coming from a book list and a search
                        // if we found the book, keeping track of the book id so that we can pass it to the backend to remove the book from this booklist
                        let bookId
                        const wantedBookLists = this.props.bookLists.filter(bookList => bookList.books.find(book => {
                            if (book.volume_id === this.props.book.volume_id) {
                                bookId = book.id
                                return true
                            }
                            return false
                        }))
                        return (
                            <div>
                                <h4>Book lists</h4>
                                <div>
                                    {wantedBookLists.map(bookList => <BookListPreview key={bookList.id} {...bookList} bookId={bookId} />)}
                                </div>
                            </div>
                        )
                    }} />
                </Switch>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        bookLists: state.userReducer.bookLists,
    }
}

export default connect(mapStateToProps, { })(withAuth(BookListContainer))