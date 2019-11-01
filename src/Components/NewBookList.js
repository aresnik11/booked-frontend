import React from 'react'
import { connect } from 'react-redux'
import { addBookList } from '../actions'

class NewBookList extends React.Component {
    state = {
        name: "",
        user_id: 1
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.addBookList(this.state)
    }

    // addBookList = (bookList) => {
    //     fetch('http://localhost:3001/api/v1/book_lists', {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Accept": "application/json"
    //         },
    //         body: JSON.stringify(bookList)
    //     })
    //     .then(resp => resp.json())
    //     .then(response => {
    //         console.log(response)
    //         if (response.errors) {
    //             console.log(response.errors)
    //         }
    //         else {
    //             this.props.addBookList(response)
    //         }
    //     })
    // }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>New book list:</label>
                <br/>
                <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                <br/><br/>
                <input type="submit" value="Create New Book List" />
            </form>
        )
    }
}

export default connect(null, { addBookList })(NewBookList)