import React from 'react'
import { connect } from 'react-redux'
import { addMessage } from '../actions'
import { Form, Message } from 'semantic-ui-react'

class New extends React.Component {
    state = {
        content: "",
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.addMessage({
            content: this.state.content,
            book_club_id: this.props.bookClubId
        })
        this.setState({
            content: ""
        })
    }

    render() {
        return (
            <div className="new-message">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Input
                        action="Send"
                        name="content"
                        placeholder="Message"
                        value={this.state.content}
                        onChange={this.handleChange}
                    />
                    {this.props.messageError
                    ?
                    <Message
                        negative
                        header='Error'
                        list={this.props.messageError}
                    />
                    :
                    null}
                </Form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        messageError: state.bookClubReducer.messageError
    }
}

export default connect(mapStateToProps, { addMessage })(New)