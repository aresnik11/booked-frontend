import React from 'react'
import SearchBooks from '../components/SearchBooks'
import BookContainer from './BookContainer'
import NumResults from '../components/NumResults'
import { connect } from 'react-redux'
import queryString from 'query-string'

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

export default SearchBooksContainer