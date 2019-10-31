import React from 'react'
import BookPreview from '../components/BookPreview'
import BookShow from '../components/BookShow'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

const BookContainer = (props) => {
    return (
        <Switch>
            {/* 4 ways the book container gets rendered */}
            <Route path="/books/:id" render={routerProps => {
                const bookId = routerProps.match.params.id
                return (
                    <div>
                        <h1>Book Page</h1>
                        <BookShow key={bookId} title="testing" />
                    </div>
                )
            }}/>
            <Route path="/booklists/:id" render={() => {
                return (
                    <div>
                        <h1>Book Container within Booklist</h1>
                        {props.searchedBooks.map(book => <BookPreview key={book.id} {...book} />)}
                    </div>
                )
            }} />
            <Route path="/search" render={() => {
                return (
                    <div>
                        <h1>Book Container within Search</h1>
                        {props.searchedBooks.map(book => <BookPreview key={book.id} {...book} />)}
                    </div>
                )
            }} />
        </Switch>

    )
}

function mapStateToProps(state) {
    return {
        searchedBooks: state.searchBooksReducer.searchedBooks,
    }
}

export default connect(mapStateToProps)(BookContainer)