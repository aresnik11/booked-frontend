import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Confirm, Label, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { removeBookClub } from '../actions'
import Delete from './Delete'

class BookClubPreview extends React.Component {
    state = {
        open: false
    }

    // show confirmation modal
    showConfirmation = () => {
        this.setState({
            open: true
        })
    }

    // closes modal on click on cancel in confirmation modal
    handleCancel = () => {
        this.setState({
            open: false
        })
    }

    // deletes book club in backend and redux store on click in confirmation model
    handleBookClubRemove = () => {
        this.props.removeBookClub(this.props.id)
        this.setState({
            open: false
        })
    }

    render() {
        return (
            <div className="book-club">
                {/* x-button, on click shows confirmation */}
                <Label as="button" id="x" content="X" size="tiny" basic onClick={this.showConfirmation} />
                {/* links to specific book club */}
                <Link to={`/bookclubs/${this.props.id}`}>
                    <div>
                        <h3>{this.props.name}</h3>
                    </div>
                </Link>
                {/* confirmation modal, hidden until x-button is clicked */}
                <Confirm
                    open={this.state.open}
                    header="Please Confirm"
                    content="Are you sure you want to delete this book club? All messages within the book club will also be deleted."
                    confirmButton="Delete"
                    onCancel={this.handleCancel}
                    onConfirm={this.handleBookClubRemove}
                />
            </div>


            /* <br/>
            <Delete type="Book Club" id={this.props.id} /> */
        )
    }
}

export default connect(null, { removeBookClub })(BookClubPreview)