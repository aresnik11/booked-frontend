import React from 'react'
import BookContainer from './BookContainer'
import BookListPreview from '../components/BookListPreview'
import NewBookList from '../components/NewBookList'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchBookLists } from '../actions'

class BookListContainer extends React.Component {
    componentDidMount() {
        // this.props.fetchBookLists()
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <h1>I'm the book list container</h1>
                <Switch>
                    <Route path="/booklists/:id" render={() => {
                        return <BookContainer />
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
        bookLists: state.booksReducer.bookLists,
    }
}

export default connect(mapStateToProps, { fetchBookLists })(BookListContainer)