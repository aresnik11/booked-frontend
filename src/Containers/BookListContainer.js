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
                                    <br/>
                                    <ShareBookList />
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
                                <NewBookList />
                                <br/><br/>
                                <Search searchTerm={this.state.searchTerm} searchHandler={this.searchBookList} />
                                <div>
                                    {filteredBookLists.map(bookList => <BookListPreview key={bookList.id} {...bookList} />)}
                                </div>
                            </div>
                        )
                    }} />
                    <Route path="/books/:id" render={routerProps => {
                        return (
                            <h1>Booklists here</h1>
                        )
                    }} />
                </Switch>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        bookLists: state.userReducer.bookLists
    }
}

export default connect(mapStateToProps, { })(BookListContainer)