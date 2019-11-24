import React from 'react'
import { connect } from 'react-redux'
import { removeBookList } from '../actions/bookList'
import { removeBookClub } from '../actions/bookClub'
import { removeAccount } from '../actions/user'
import { Button, Confirm, Icon } from 'semantic-ui-react'
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

    // deletes account and removes token from localStorage on click in confirmation modal
    handleAccountRemove = () => {
        this.props.removeAccount()
        localStorage.removeItem("token")
    }

    render() {
        return (
            <>
                {/* if we're on a book club page, render special x-button, otherwise regular delete button */}
                {this.props.type === "Book Club"
                ?
                <Icon
                    className="x"
                    onClick={this.showConfirmation}
                />
                :
                <Button
                    // only add btn className if type is not Account - btn changes color
                    className={this.props.type === "Account" ? null : "btn"}
                    color="black"
                    onClick={this.showConfirmation}
                    content="Delete"
                />}
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
                {/* confirmation modal, hidden until delete is clicked and we're on a book club */}
                {this.props.type === "Account"
                ?
                <Confirm
                    open={this.state.open}
                    header="Please Confirm"
                    content="Are you sure you want to delete your account?"
                    confirmButton="Delete"
                    onCancel={this.handleCancel}
                    onConfirm={this.handleAccountRemove}
                />
                :
                null}
            </>
        )
    }

}

export default connect(null, { removeBookList, removeBookClub, removeAccount })(withRouter(Delete))