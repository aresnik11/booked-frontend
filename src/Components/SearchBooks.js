import React from 'react'
import { connect } from 'react-redux'
import { fetchSearchedBooks, setLoading } from '../actions'
import { Form } from 'semantic-ui-react'

class SearchBooks extends React.Component {
    state = {
        search: this.props.searchTerm,
        type: this.props.searchType,
        index: 0
    }

    //react semantic passes all props from react semantic component as an object as the second argument to onChange
    //destructuring to pull out the name and value keys
    //need this here since the radio buttons e.target is technically the label
    handleChange = (e, { value, name }) => {
        this.setState({
            [name]: value
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
                <h1>Search Books</h1>
                <Form onSubmit={this.handleSubmit} className="small-input">
                    <Form.Input
                        name="search"
                        type="search"
                        placeholder="Search..."
                        value={this.state.search}
                        onChange={this.handleChange}
                    />
                    <Form.Group inline stackable="true">
                        <Form.Radio
                            label='All'
                            name="type"
                            value=''
                            checked={this.state.type === ""}
                            onChange={this.handleChange}
                        />
                        <Form.Radio
                            label='Title'
                            name="type"
                            value='intitle:'
                            checked={this.state.type === "intitle:"}
                            onChange={this.handleChange}
                        />
                        <Form.Radio
                            label='Author'
                            name="type"
                            value='inauthor:'
                            checked={this.state.type === "inauthor:"}
                            onChange={this.handleChange}
                        />
                        <Form.Radio
                            label='Genre'
                            name="type"
                            value='subject:'
                            checked={this.state.type === "subject:"}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <br/>
                    <Form.Button basic content="Search" />
                </Form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        searchTerm: state.searchBooksReducer.searchTerm,
        searchType: state.searchBooksReducer.searchType
    }
}

export default connect(mapStateToProps, { fetchSearchedBooks, setLoading })(SearchBooks)