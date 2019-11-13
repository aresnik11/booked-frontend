import React from 'react'
import BookPreview from '../components/BookPreview'
import BookListPreview from '../components/BookListPreview'
import New from '../components/New'
import Delete from '../components/Delete'
import Search from '../components/Search'
import ShareBookList from '../components/ShareBookList'
import { Route, Switch, Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import withAuth from '../withAuth'
import { Grid, Button } from 'semantic-ui-react'
import { resetSelectedBook } from '../actions'

class BookListContainer extends React.Component {
    state = {
        searchTerm: ""
    }

    searchHandler = (e) => {
        this.setState({
            searchTerm: e.target.value
        })
    }

    componentDidMount() {
        //need to reset selectedBook back to null so that if you click on a book preview after searching and clicking on a book preview everything works as expected
        this.props.resetSelectedBook()
    }

    render() {
        return (
            <Switch>
                <Route exact path="/booklists/:id" render={(routerProps) => {
                    //find the booklist that matches this id from this users booklists
                    const bookListId = parseInt(routerProps.match.params.id)
                    const bookListObj = this.props.bookLists.find(bookList => bookList.id === bookListId)
                    // only render components if we found the book list object
                    if (bookListObj) {
                        const filteredBooks = bookListObj.books.filter(book => book.title.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
                        return (
                            <div>
                                <h1>{bookListObj.name}</h1>
                                <br/>
                                <Grid columns="equal">
                                    <Grid.Column>
                                        <ShareBookList {...bookListObj} />
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Link to="/search">
                                            <Button
                                                id="btn"
                                                content="Search All Books"
                                            />
                                        </Link>
                                        <br/><br/>
                                        <Delete type="Book List" id={bookListObj.id} />
                                    </Grid.Column>
                                    {bookListObj.books.length
                                    ?
                                    <Grid.Column>
                                        <Search type="Books" searchTerm={this.state.searchTerm} searchHandler={this.searchHandler} />
                                    </Grid.Column>
                                    :
                                    null}
                                </Grid>
                                <br/><br/>
                                <Grid centered>
                                    {filteredBooks.map(book => <BookPreview key={book.id} {...book} bookListId={bookListId} />)}
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
                    const filteredBookLists = this.props.bookLists.filter(bookList => bookList.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
                    return (
                        <div>
                            <h1>My Book Lists</h1>
                            <br/>
                            <Grid columns="equal">
                                <Grid.Column>
                                    <New type="Book List" />
                                </Grid.Column>
                                {this.props.bookLists.length
                                ?
                                <Grid.Column>
                                    <Search type="Book Lists" searchTerm={this.state.searchTerm} searchHandler={this.searchHandler} />
                                </Grid.Column>
                                :
                                null}
                            </Grid>

                            <Grid centered>
                                {filteredBookLists.map(bookList => <BookListPreview key={bookList.id} {...bookList} />)}
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