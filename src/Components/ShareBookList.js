import React from 'react'
import { connect } from 'react-redux'
import { fetchUsers } from '../actions'
import { Form, Message } from 'semantic-ui-react'

class ShareBookList extends React.Component {
    state = {
        value: "",
        shareError: false,
        shared: false
    }

    componentDidMount() {
        this.props.fetchUsers()
    }

    handleChange = (e, { value }) => {
        this.setState({
            value: value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        //this.props.id is booklist id, this.state.value is user id we want to send this to
        this.shareBookList(this.props.id, this.state.value)
    }

    shareBookList = (bookListId, userId) => {
        fetch("http://localhost:3001/api/v1/share_book_lists", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            },
            body: JSON.stringify({
                book_list_id: bookListId,
                user_id: userId
            })
        })
        .then(resp => resp.json())
        .then(response => {
            if (response.errors) {
                this.setState({
                    shareError: response.errors
                })
            }
            else {
                this.setState({
                    shareError: false,
                    shared: true
                })
            }
        })
    }
    
    render() {
        //setting options default to empty array so that dropdown will still load while we're fetching all users
        let options = []
        //once we have fetched users (no longer loading), update the dropdown
        if (!this.props.loading) {
            // creating an array of objects for each user that will be an option in the dropdown
            options = this.props.users.map(user => {
                return { key: user.id, value: user.id, text: user.username }
            })
        }

        return (
            <div>
                <h4>Share Book List</h4>
                {this.state.shared
                ?
                <>
                    <Message
                        positive
                        className="small-input"
                        header='Success'
                        content="Book list shared"
                    />
                    <br/>
                </>
                :
                null}
                <Form onSubmit={this.handleSubmit} className="small-input">
                    <Form.Select
                        search
                        placeholder="Select a user"
                        options={options}
                        onChange={this.handleChange}
                    />
                    {this.state.shareError
                    ?
                    <Message
                        negative
                        header='Error'
                        list={this.state.shareError}
                    />
                    :
                    null}
                    <Form.Button
                        className="btn"
                        content="Share"
                    />
                </Form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        users: state.userReducer.users,
        loading: state.userReducer.loading
    }
}

export default connect(mapStateToProps, { fetchUsers })(ShareBookList)