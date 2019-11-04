import React from 'react'
import SearchBooks from '../components/SearchBooks'
import BookContainer from './BookContainer'
import NumResults from '../components/NumResults'
import withAuth from '../withAuth'

class SearchBooksContainer extends React.Component {
    render() {
        return (
            <div>
                <h1>Search Books Container</h1>
                <SearchBooks />
                <NumResults />
                <BookContainer />
            </div>
        )
    }
}

export default withAuth(SearchBooksContainer)