import React from 'react'
import { connect } from 'react-redux'
import { removeBookList, removeBookClub } from '../actions'
import { Button, Confirm } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

class Delete extends React.Component {
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

    // deletes book list in backend and redux store on click in confirmation model
    handleBookListRemove = () => {
        this.props.removeBookList(this.props.id)
        .then(() => this.props.history.push("/booklists"))
    }

    // deletes book club in backend and redux store on click in confirmation model
    handleBookClubRemove = () => {
        this.props.removeBookClub(this.props.id)
        .then(() => this.props.history.push("/bookclubs"))
    }

    render() {
        return (
            <div>
                <Button
                    className="btn"
                    onClick={this.showConfirmation}
                    content="Delete"
                />
                {/* confirmation modal, hidden until delete is clicked and we're on a book list */}
                {this.props.type === "Book List"
                ?
                <Confirm
                    open={this.state.open}
                    header="Please Confirm"
                    content="Are you sure you want to delete this book list? All of the books on the book list will also be deleted."
                    confirmButton="Delete"
                    onCancel={this.handleCancel}
                    onConfirm={this.handleBookListRemove}
                />
                :
                null}
                {/* confirmation modal, hidden until delete is clicked and we're on a book club */}
                {this.props.type === "Book Club"
                ?
                <Confirm
                    open={this.state.open}
                    header="Please Confirm"
                    content="Are you sure you want to delete this book club? All messages within the book club will also be deleted."
                    confirmButton="Delete"
                    onCancel={this.handleCancel}
                    onConfirm={this.handleBookClubRemove}
                />
                :
                null}
            </div>
        )
    }

}

export default connect(null, { removeBookList, removeBookClub })(withRouter(Delete))