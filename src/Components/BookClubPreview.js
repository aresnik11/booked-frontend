import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Confirm } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { removeBookClub } from '../actions'
import Delete from './Delete'

class BookClubPreview extends React.Component {
    // state = {
    //     open: false
    // }

    // showConfirmation = () => {
    //     this.setState({
    //         open: true
    //     })
    // }

    // handleCancel = () => {
    //     this.setState({
    //         open: false
    //     })
    // }

    // handleBookClubRemove = () => {
    //     this.props.removeBookClub(this.props.id)
    //     this.setState({
    //         open: false
    //     })
    // }

    render() {
        return (
            <Link to={`/bookclubs/${this.props.id}`} className="book-club">
                <h3>{this.props.name}</h3>
                
            </Link>

            /* <br/>
            <Delete type="Book Club" id={this.props.id} /> */
        )
    }
}

export default connect(null, { removeBookClub })(BookClubPreview)