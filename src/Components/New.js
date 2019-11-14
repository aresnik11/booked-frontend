import React from 'react'
import { connect } from 'react-redux'
import { addBookList, addBookClub, addMessage } from '../actions'
import { Form, Message } from 'semantic-ui-react'

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
                    {this.props.bookListError && this.props.type === "Book List"
                    ?
                    <Message
                        negative
                        header='Error'
                        list={this.props.bookListError}
                    />
                    :
                    null}
                    {this.props.bookClubError && this.props.type === "Book Club"
                    ?
                    <Message
                        negative
                        header='Error'
                        list={this.props.bookClubError}
                    />
                    :
                    null}
                    {this.props.messageError && this.props.type === "Message"
                    ?
                    <Message
                        negative
                        header='Error'
                        list={this.props.messageError}
                    />
                    :
                    null}
                    <Form.Button
                        className="btn"
                        content="Add"
                    />
                </Form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        bookListError: state.bookListReducer.bookListError,
        bookClubError: state.bookClubReducer.bookClubError,
        messageError: state.bookClubReducer.messageError
    }
}

export default connect(mapStateToProps, { addBookList, addBookClub, addMessage })(New)