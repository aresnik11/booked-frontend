import React from 'react'
import { connect } from 'react-redux'
import { addBookList, addBookClub } from '../actions'
import { Form, Message } from 'semantic-ui-react'

class New extends React.Component {
    state = {
        name: "",
    }

    // controlled form
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        // send submitted values to the backend and update redux store
        if (this.props.type === "Book List") {
            this.props.addBookList(this.state)
        }
        else if (this.props.type === "Book Club") {
            this.props.addBookClub(this.state)
        }
        // resets name in state so form looks submitted
        this.setState({
            name: ""
        })
    }

    render() {
        return (
            <div>
                <h4>Add New {this.props.type}</h4>
                <Form onSubmit={this.handleSubmit} className="small-input">
                    <Form.Input
                        name="name"
                        placeholder={`${this.props.type} Name`}
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                    {/* only show message if there is a book list error and we're adding a book list */}
                    {this.props.bookListError && this.props.type === "Book List"
                    ?
                    <Message
                        negative
                        header='Error'
                        list={this.props.bookListError}
                    />
                    :
                    null}
                    {/* only show message if there is a book club error and we're adding a book club */}
                    {this.props.bookClubError && this.props.type === "Book Club"
                    ?
                    <Message
                        negative
                        header='Error'
                        list={this.props.bookClubError}
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
    }
}

export default connect(mapStateToProps, { addBookList, addBookClub })(New)