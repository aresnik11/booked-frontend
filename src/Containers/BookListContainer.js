import React from 'react'
import BookPreview from '../components/BookPreview'
import BookListPreview from '../components/BookListPreview'
import New from '../components/New'
import Delete from '../components/Delete'
import Search from '../components/Search'
import ShareBookList from '../components/ShareBookList'
import { Route, Switch, Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import withAuth from '../components/withAuth'
import { Grid, Button } from 'semantic-ui-react'
import { resetSelectedBook } from '../actions'

class BookListContainer extends React.Component {
    state = {
        searchTerm: ""
    }

    // controlled search form
    searchHandler = (e) => {
        this.setState({
            searchTerm: e.target.value
        })
    }

    componentDidMount() {
        //need to reset selectedBook back to null so that if you click on a book preview after searching and clicking on a book preview everything works as expected
        this.props.resetSelectedBook()
    }

    // filters books on book list based on search term, creates a book preview component for each book in filtered books
    makeBookListBooks = (bookListObj) => {
        const filteredBooks = bookListObj.books.filter(book => book.title.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
        return filteredBooks.map(book => <BookPreview key={book.id} {...book} bookListId={bookListObj.id} />)
    }

    // filters book lists based on search term, creates a book list preview component for each book list in filtered book lists
    makeBookLists = () => {
        const filteredBookLists = this.props.bookLists.filter(bookList => bookList.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
        return filteredBookLists.map(bookList => <BookListPreview key={bookList.id} {...bookList} />)
    }

    render() {
        return (
            // render differently depending on if route if /booklists/:id or /booklists
            <Switch>
                <Route exact path="/booklists/:id" render={(routerProps) => {
                    //find the booklist that matches this id from this users booklists
                    const bookListId = parseInt(routerProps.match.params.id)
                    const bookListObj = this.props.bookLists.find(bookList => bookList.id === bookListId)
                    // only render components if we found the book list object
                    if (bookListObj) {
                        return (
                            <div>
                                <h1>{bookListObj.name}</h1>
                                <br/>
                                {/* options grid including share book list, link to search all books, delete book list, search books */}
                                <Grid columns="equal">
                                    <Grid.Column>
                                        <ShareBookList {...bookListObj} />
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Link to="/search">
                                            <Button
                                                className="btn"
                                                content="Search All Books"
                                            />
                                        </Link>
                                        <br/><br/>
                                        <Delete type="Book List" id={bookListObj.id} />
                                    </Grid.Column>
                                    {/* only render search component if there are books on the book list */}
                                    {bookListObj.books.length
                                    ?
                                    <Grid.Column>
                                        <Search type="Books" searchTerm={this.state.searchTerm} searchHandler={this.searchHandler} />
                                    </Grid.Column>
                                    :
                                    null}
                                </Grid>
                                <br/><br/>

                                {/* books on book list */}
                                <Grid centered>
                                    {this.makeBookListBooks(bookListObj)}
                                </Grid>
                            </div>
                        )
                    }
                    // if we couldn't find the book list object, redirect to /error, which will render the Error component
                    else {
                        return <Redirect to="/error" />
                    }
                }} />
                <Route exact path="/booklists" render={() => {
                    return (
                        <div>
                            <h1>My Book Lists</h1>
                            <br/>
                            {/* options grid including new book list and search book lists */}
                            <Grid columns="equal">
                                <Grid.Column>
                                    <New type="Book List" />
                                </Grid.Column>
                                {/* only render search component if there are book lists */}
                                {this.props.bookLists.length
                                ?
                                <Grid.Column>
                                    <Search type="Book Lists" searchTerm={this.state.searchTerm} searchHandler={this.searchHandler} />
                                </Grid.Column>
                                :
                                null}
                            </Grid>

                            {/* book lists */}
                            <Grid centered>
                                {this.makeBookLists()}
                            </Grid>
                        </div>
                    )
                }} />
                {/* if we didn't match either path, redirect to error */}
                <Redirect to="/error" />
            </Switch>
        )
    }
}

function mapStateToProps(state) {
    return {
        bookLists: state.bookListReducer.bookLists,
    }
}

export default connect(mapStateToProps, { resetSelectedBook })(withAuth(BookListContainer))