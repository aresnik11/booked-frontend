import React from 'react'
import { connect } from 'react-redux'
import { removeBookList, removeBookClub } from '../actions'
import { Button, Confirm } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

class Delete extends React.Component {
    state = {
        open: false
    }

    showConfirmation = () => {
        this.setState({
            open: true
        })
    }

    handleCancel = () => {
        this.setState({
            open: false
        })
    }

    handleBookListRemove = () => {
        this.props.removeBookList(this.props.id)
        this.props.history.push("/booklists")
    }

    handleBookClubRemove = () => {
        this.props.removeBookClub(this.props.id)
        this.props.history.push("/bookclubs")
    }

    render() {
        return (
            <div>
                <Button
                    id="btn"
                    onClick={this.showConfirmation}
                    content="Delete"
                />
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
                <Confirm
                    open={this.state.open}
                    header="Please Confirm"
                    content="Are you sure you want to delete this book club? All messages within the book club will also be deleted."
                    confirmButton="Delete"
                    onCancel={this.handleCancel}
                    onConfirm={this.handleBookClubRemove}
                />
                }
                
            </div>
        )
    }

}

export default connect(null, { removeBookList, removeBookClub })(withRouter(Delete))