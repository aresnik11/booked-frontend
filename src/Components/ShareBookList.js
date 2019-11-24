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
        // fetches all users to use as options in share book list dropdown
        this.props.fetchUsers()
    }

    // controlled form
    handleChange = (e, { value }) => {
        this.setState({
            value: value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        // this.props.id is booklist id, this.state.value is user id we want to send this to - sends to backend
        this.shareBookList(this.props.id, this.state.value)
        // resets value in state so form looks submitted
    }

    // adds shared book list to user we shared it with in backend
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
            // if we got back an error, set error in state
            if (response.errors) {
                this.setState({
                    shareError: response.errors
                })
            }
            // otherwise it was successfully shared, set shared to true in state
            else {
                this.setState({
                    shareError: false,
                    shared: true,
                    value: ""
                })
            }
        })
    }
    
    render() {
        // setting options default to empty array so that dropdown will still load while we're fetching all users
        let options = []
        // once we have fetched users (no longer loading), update the dropdown
        if (!this.props.loading) {
            // creating an array of objects for each user that will be an option in the dropdown
            options = this.props.users.map(user => {
                return { key: user.id, value: user.id, text: user.username }
            })
        }

        return (
            <div>
                <h4>Share Book List</h4>
                {/* message appears on successful book list share */}
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
                    {/* message appears on share book list error */}
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