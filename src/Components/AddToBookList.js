import React from 'react'
import { connect } from 'react-redux'
import { addBookListBook } from '../actions/bookList'
import { Form, Message } from 'semantic-ui-react'

class AddToBookList extends React.Component {
    state = {
        value: "",
        addBookError: false
    }

    // controlled form
    handleChange = (e, { value }) => {
        this.setState({
            value: value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        // finding or creating submitted book
        this.addBook(this.props.book)
    }

    //need to add or find the book in the backend before adding it to a booklist (creating a booklistbook)
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
            if (response.errors) {
                this.setState({
                    addBookError: response.errors
                })
            }
            else {
                // send found or created book to the backend with submitted value (book list) and update redux store
                this.props.addBookListBook(response, this.state.value)
            }
        })
    }

    render() {
        // creating an array of objects for each of the users book lists that will be an option in the dropdown
        const options = this.props.bookLists.map(bookList => {
            return { key: bookList.id, value: bookList.id, text: bookList.name }
        })
        return (
            <Form onSubmit={this.handleSubmit} className="add-to-booklist">
                <Form.Select
                    search
                    placeholder="Select a book list"
                    options={options}
                    onChange={this.handleChange}
                />
                {/* show message if error adding book to book list */}
                {this.props.addError
                ?
                <Message
                    negative
                    header='Error'
                    list={this.props.addError}
                />
                :
                null}
                {/* show message if error  */}
                {this.state.addBookError
                ?
                <Message
                    negative
                    header='Error'
                    list={this.state.addBookError}
                />
                :
                null}
                <Form.Button
                    className="btn"
                    content="Add to Book List"
                />
            </Form>
        )
    }
}

function mapStateToProps(state) {
    return {
        bookLists: state.bookListReducer.bookLists,
        addError: state.bookListReducer.addError
    }
}

export default connect(mapStateToProps, { addBookListBook })(AddToBookList)