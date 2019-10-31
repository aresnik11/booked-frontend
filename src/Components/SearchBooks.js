import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class SearchBooks extends React.Component {
    state = {
        search: "",
        type: ""
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        // this.props.history.push(`/?search=${this.state.search}&type=${this.state.type}`)
        this.fetchBooks(this.state)
    }

    fetchBooks = ({ search, type }) => {
        //     console.log(this.props.location)
        //     const query = queryString.parse(this.props.location.search)
        //     console.log(query)
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
                this.props.fetchBooks(response.totalItems, response.books)
            })
        }

    render() {
        return (
            <div>
                <h4>Search Books</h4>
                <form onSubmit={this.handleSubmit} >
                    <input
                        type="text"
                        name="search"
                        placeholder="Search..."
                        value={this.state.search}
                        onChange={this.handleChange}
                    />
                    <br/><br/>
                    <input
                        type="radio"
                        name="type"
                        value=""
                        checked={this.state.type === ""}
                        onChange={this.handleChange}
                    />
                    <label>All</label>
                    &nbsp;&nbsp;&nbsp;
                    <input
                        type="radio"
                        name="type"
                        value="intitle:"
                        checked={this.state.type === "intitle:"}
                        onChange={this.handleChange}
                    />
                    <label>Title</label>
                    &nbsp;&nbsp;&nbsp;
                    <input
                        type="radio"
                        name="type"
                        value="inauthor:"
                        checked={this.state.type === "inauthor:"}
                        onChange={this.handleChange}
                    />
                    <label>Author</label>
                    &nbsp;&nbsp;&nbsp;
                    <input
                        type="radio"
                        name="type"
                        value="subject:"
                        checked={this.state.type === "subject:"}
                        onChange={this.handleChange}
                    />
                    <label>Genre</label>
                    <br/><br/>
                    <input type="submit" value="Search" />
                </form>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchBooks: (totalItems, books) => {
            dispatch({
                type: "FETCH_SEARCHED_BOOKS",
                payload: {
                    totalItems: totalItems,
                    searchedBooks: books
                }
            })
        }
    }
}

export default connect(null, mapDispatchToProps)(SearchBooks)