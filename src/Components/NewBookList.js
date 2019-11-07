import React from 'react'
import { connect } from 'react-redux'
import { addBookList } from '../actions'
import { Form } from 'semantic-ui-react'

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
            <div>
                <h4>Add New Book List</h4>
                <Form onSubmit={this.handleSubmit} className="small-input">
                    <Form.Input
                        name="name"
                        placeholder="Book List Name"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                    <Form.Button basic content="Add" />
                </Form>
            </div>
            
        )
    }
}

export default connect(null, { addBookList })(NewBookList)