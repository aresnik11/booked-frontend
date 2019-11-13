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
            <div>
                <Link to={`/bookclubs/${this.props.id}`}>
                    <h3>{this.props.name}</h3>
                </Link>
                <br/>
                <Delete type="Book Club" id={this.props.id} />
                {/* <Button
                    id="btn"
                    onClick={this.showConfirmation}
                    content="Delete Book Club"
                />
                <Confirm
                    open={this.state.open}
                    header="Please Confirm"
                    content="Are you sure you want to delete this book club? All messages will also be deleted."
                    confirmButton="Delete"
                    onCancel={this.handleCancel}
                    onConfirm={this.handleBookClubRemove}
                /> */}
                <br/><br/>
            </div>
        )
    }
}

export default connect(null, { removeBookClub })(BookClubPreview)