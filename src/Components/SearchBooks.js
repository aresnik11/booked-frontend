import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchSearchedBooks, setLoading } from '../actions'

class SearchBooks extends React.Component {
    state = {
        search: this.props.searchTerm,
        type: this.props.searchType,
        index: 0
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.setLoading()
        this.props.fetchSearchedBooks(this.state)
    }

    render() {
        return (
            <div>
                <h4>Search Books</h4>
                <form onSubmit={this.handleSubmit} >
                    <input
                        type="search"
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

function mapStateToProps(state) {
    return {
        searchTerm: state.booksReducer.searchTerm,
        searchType: state.booksReducer.searchType
    }
}

export default connect(mapStateToProps, { fetchSearchedBooks, setLoading })(SearchBooks)