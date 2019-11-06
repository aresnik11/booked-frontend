import React from 'react'
import SearchBooks from '../components/SearchBooks'
import SearchBooksContainer from './SearchBooksContainer'
import withAuth from '../withAuth'

class SearchContainer extends React.Component {
    render() {
        return (
            <div>
                <h1>Search Books Container</h1>
                <SearchBooks />
                <br/>
                <SearchBooksContainer />
            </div>
        )
    }
}

export default withAuth(SearchContainer)