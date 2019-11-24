import React from 'react'
import { connect } from 'react-redux'
import { addMessage } from '../actions/bookClub'
import { Form, Message } from 'semantic-ui-react'

class New extends React.Component {
    state = {
        content: "",
    }

    // controlled form
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        // send submitted values and current book club to the backend and update redux store
        this.props.addMessage({
            content: this.state.content,
            book_club_id: this.props.bookClubId
        })
        // reset content in state so form looks submitted
        this.setState({
            content: ""
        })
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Input
                    action="Send"
                    name="content"
                    placeholder="Message"
                    value={this.state.content}
                    onChange={this.handleChange}
                />
                {/* only show message if there is an error */}
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
        )
    }
}

function mapStateToProps(state) {
    return {
        messageError: state.bookClubReducer.messageError
    }
}

export default connect(mapStateToProps, { addMessage })(New)