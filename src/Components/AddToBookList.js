import React from 'react'
import { connect } from 'react-redux'
import { fetchBookLists } from '../actions'

class AddToBookList extends React.Component {
    state = {
        value: ""
    }

    componentDidMount() {
        this.props.fetchBookLists()
    }

    handleChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.state)
    }

    render() {
        console.log(this.props.bookLists)
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
        bookLists: state.booksReducer.bookLists,
    }
}

export default connect(mapStateToProps, { fetchBookLists })(AddToBookList)