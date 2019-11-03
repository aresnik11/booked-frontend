import React from 'react'
import BookContainer from './BookContainer'
import BookListPreview from '../components/BookListPreview'
import NewBookList from '../components/NewBookList'
import BookListShow from '../components/BookListShow'
import Error from '../components/Error'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

class BookListContainer extends React.Component {
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
                                    {/* maybe just have the h1 here and remove BookListShow component */}
                                    <BookListShow name={bookListObj.name} />
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
                        return (
                            <div>
                                <h1>Booklist container</h1>
                                <NewBookList />
                                {this.props.bookLists.map(bookList => <BookListPreview key={bookList.id} {...bookList} />)}
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
        bookLists: state.userReducer.bookLists
    }
}

export default connect(mapStateToProps, { })(BookListContainer)