import React from 'react'
import { connect } from 'react-redux'
import { addBookList } from '../actions'

class NewBookList extends React.Component {
    state = {
        name: "",
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.addBookList(this.state)
        this.setState({
            name: ""
        })
    }

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