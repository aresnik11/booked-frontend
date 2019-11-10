import React from 'react'
import { connect } from 'react-redux'
import { addBookList, addBookClub, addMessage } from '../actions'
import { Form } from 'semantic-ui-react'

class New extends React.Component {
    state = {
        text: "",
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if (this.props.type === "Book List") {
            this.props.addBookList({name: this.state.text})
        }
        else if (this.props.type === "Book Club") {
            this.props.addBookClub({name: this.state.text})
        }
        else if (this.props.type === "Message") {
            this.props.addMessage({
                content: this.state.text,
                book_club_id: this.props.bookClub.id
            })
        }
        this.setState({
            text: ""
        })
    }

    render() {
        const placeholder = this.props.type === "Message" ? `${this.props.type}` : `${this.props.type} Name`
        return (
            <div>
                <h4>Add New {this.props.type}</h4>
                <Form onSubmit={this.handleSubmit} className="small-input">
                    <Form.Input
                        name="text"
                        placeholder={placeholder}
                        value={this.state.text}
                        onChange={this.handleChange}
                    />
                    <Form.Button basic content="Add" />
                </Form>
            </div>
        )
    }
}

export default connect(null, { addBookList, addBookClub, addMessage })(New)