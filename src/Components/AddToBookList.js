import React from 'react'
import { connect } from 'react-redux'
import { addBookListBook } from '../actions'

class AddToBookList extends React.Component {
    state = {
        value: this.props.bookLists ? this.props.bookLists[0].id : ""
    }

    handleChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.addBook(this.props.book)
    }

    addBook = (book) => {
        fetch("http://localhost:3001/api/v1/books", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(book)
        })
        .then(resp => resp.json())
        .then(response => {
            console.log("repsonse from book post", response)
            if (response.errors) {
                alert(response.errors)
            }
            else {
                this.props.addBookListBook(response, this.state.value)
            }
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Select a book list:</label>
                <br/>
                <select value={this.state.value} onChange={this.handleChange}>
                    {/* creating an option tag for each bookList */}
                    {this.props.bookLists.map(bookList => <option key={bookList.id} value={bookList.id}>{bookList.name}</option>)}
                </select>
                <br/><br/>
                <input type="submit" value="Add to Book List" />
            </form>
        )
    }
}

function mapStateToProps(state) {
    return {
        bookLists: state.userReducer.bookLists
    }
}

export default connect(mapStateToProps, { addBookListBook })(AddToBookList)