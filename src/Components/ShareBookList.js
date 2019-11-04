import React from 'react'
import { connect } from 'react-redux'
import { fetchUsers } from '../actions'

class ShareBookList extends React.Component {
    state = {
        value: this.props.users[0] ? this.props.users[0].id : "",
    }

    componentDidMount() {
        fetch("http://localhost:3001/api/v1/users", {
            headers: {
                "Authorization": `Bearer ${localStorage.token}`
            }
        })
        .then(resp => resp.json())
        .then(response => {
            this.props.fetchUsers(response)
        })
    }

    handleChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log("sharing to", this.state)
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
            console.log(response)
        })
    }
    
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Select a user:</label>
                <br/>
                <select value={this.state.value} onChange={this.handleChange}>
                    {/* creating an option tag for each user */}
                    {this.props.users.map(user => <option key={user.id} value={user.id}>{user.username}</option>)}
                </select>
                <br/><br/>
                <input type="submit" value="Share Book List" />
            </form>
        )
    }
}

function mapStateToProps(state) {
    return {
        users: state.userReducer.users
    }
}

export default connect(mapStateToProps, { fetchUsers })(ShareBookList)