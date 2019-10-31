import React from 'react'
import SearchBooks from '../Components/SearchBooks'
import BookContainer from './BookContainer'

class SearchBooksContainer extends React.Component {
    state = {
        searchedBooks: []
    }

     getBooks = ({ search, type }) => {
        fetch('http://localhost:3001/api/v1/search', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Search-Term": `${search}`,
                "Search-Type": `${type}`
            }
        })
        .then(resp => resp.json())
        .then(response => {
            console.log("total items:", response.totalItems)
            console.log("books:", response.books)
            this.setState({
                searchedBooks: response.books
            })
        })
    }
    render() {
        return (
            <div>
                <h1>Search Books Container</h1>
                <SearchBooks getBooks={this.getBooks} />
                <BookContainer books={this.state.searchedBooks} />
            </div>
        )
    }
}

export default SearchBooksContainer