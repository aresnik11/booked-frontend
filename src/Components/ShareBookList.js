import React from 'react'
import { connect } from 'react-redux'
import { fetchUsers, shareBookList } from '../actions'
import { Form } from 'semantic-ui-react'

class ShareBookList extends React.Component {
    state = {
        // value: this.props.users[0] ? this.props.users[0].id : "",
        value: ""
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
        console.log("sharing to", this.state)
        //this.props.id is booklist id, this.state.value is user id we want to send this to
        this.props.shareBookList(this.props.id, this.state.value)
    }

    // shareBookList = (bookListId, userId) => {
    //     fetch("http://localhost:3001/api/v1/share_book_lists", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Accept": "application/json",
    //             "Authorization": `Bearer ${localStorage.token}`
    //         },
    //         body: JSON.stringify({
    //             book_list_id: bookListId,
    //             user_id: userId
    //         })
    //     })
    //     .then(resp => resp.json())
    //     .then(response => {
    //         console.log(response)
    //         alert("book list shared!")
    //     })
    // }
    
    render() {
        // creating an array of objects for each user that will be an option in the dropdown
        const options = this.props.users.map(user => {
            return { key: user.id, value: user.id, text: user.username }
        })
        return (
            <div>
                <h4>Share Book List</h4>
                <Form onSubmit={this.handleSubmit} className="small-input">
                    <Form.Select
                        placeholder="Select a user"
                        options={options}
                        onChange={this.handleChange}
                    />
                    <Form.Button basic content="Share" />
                </Form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        users: state.userReducer.users
    }
}

export default connect(mapStateToProps, { fetchUsers, shareBookList })(ShareBookList)