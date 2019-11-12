import React from 'react'
import BookPreview from '../components/BookPreview'
import BookListPreview from '../components/BookListPreview'
import New from '../components/New'
import BookListClubShow from '../components/BookListClubShow'
import Search from '../components/Search'
import Error from '../components/Error'
import ShareBookList from '../components/ShareBookList'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import withAuth from '../withAuth'
import { Grid } from 'semantic-ui-react'

class BookListContainer extends React.Component {
    state = {
        searchTerm: ""
    }

    searchHandler = (e) => {
        this.setState({
            searchTerm: e.target.value
        })
    }

    render() {
        return (
            <Switch>
                <Route path="/booklists/:id" render={(routerProps) => {
                    //find the booklist that matches this id from this users booklists
                    const bookListId = parseInt(routerProps.match.params.id)
                    const bookListObj = this.props.bookLists.find(bookList => bookList.id === bookListId)
                    // only render components if we found the book list object
                    if (bookListObj) {
                        const filteredBooks = bookListObj.books.filter(book => book.title.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
                        return (
                            <div>
                                <BookListClubShow type="Book List" {...bookListObj} />
                                <br/><br/>
                                <ShareBookList {...bookListObj} />
                                <br/><br/>
                                {filteredBooks.length ? <Search type="Books" searchTerm={this.state.searchTerm} searchHandler={this.searchHandler} /> : null}
                                <br/><br/>
                                <Grid centered>
                                    {filteredBooks.map(book => <BookPreview key={book.id} {...book} bookListId={bookListId} />)}
                                </Grid>
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
                            <New type="Book List" />
                            <br/><br/>
                            {filteredBookLists.length ? <Search type="Book Lists" searchTerm={this.state.searchTerm} searchHandler={this.searchHandler} /> : null}
                            <br/><br/>
                            <Grid centered>
                                {filteredBookLists.map(bookList => <BookListPreview key={bookList.id} {...bookList} />)}
                            </Grid>
                        </div>
                    )
                }} />
            </Switch>
        )
    }
}

function mapStateToProps(state) {
    return {
        bookLists: state.bookListReducer.bookLists,
    }
}

export default connect(mapStateToProps)(withAuth(BookListContainer))