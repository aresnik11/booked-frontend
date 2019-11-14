import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { removeBookList } from '../actions'
import { Button, Confirm } from 'semantic-ui-react'
import Delete from './Delete'

class BookListPreview extends React.Component {
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

    // handleBookListRemove = () => {
    //     this.props.removeBookList(this.props.id)
    //     this.setState({
    //         open: false
    //     })
    // }

    //returns a random number between 0 and n
    getRandomNumber = (n) => {
        return Math.floor(Math.random() * n)
    }

    //randomizes class names so books on book shelf have different colors by random
    getRandomColorClassName = () => {
        const classNameArray = ["bl-book bl-book-grey", "bl-book bl-book-blue", "bl-book bl-book-dark-grey", "bl-book bl-book-light-blue"]
        return classNameArray[this.getRandomNumber(classNameArray.length)]
    }

    makeBookShelfBooks = () => {
        //book shelf code from https://codepen.io/kzf/pen/vEYVmL
        //if there are books in the booklist, make 5 books
        if (this.props.books.length) {
            const randomNum = this.getRandomNumber(5)
            return this.props.books.slice(0,5).map((book, index) => {
                //if this index matches our random number, make a tilted book with a random color and only show first 53 chars of title
                if (index === randomNum) {
                    return (
                        <div key={book.id} className="bl-book-tilted">
                            <div className={this.getRandomColorClassName()}>
                                <h3>{book.title.slice(0,53)}</h3>
                            </div>
                        </div>
                    )
                }
                //otherwise make a regular book with a random color and only show first 53 chars of title
                else {
                    return (
                        <div key={book.id} className={this.getRandomColorClassName()}>
                            <h3>{book.title.slice(0,53)}</h3>
                        </div>
                    )
                }
            })
        }
        //otherwise, make an empty book so bookshelf renders
        else {
            return (
                <div className="bl-book">
                </div>
            )
        }
    }

    render() {
        return (
            <div className="bookshelf-container">
                <Link to={`/booklists/${this.props.id}`}>
                    <h3>{this.props.name}</h3>
                    <div className="bookshelf">
                        {this.makeBookShelfBooks()}
                    </div>
                </Link>
                <br/>
                <Delete type="Book List" id={this.props.id} />
                {/* <Button
                    className="btn"
                    onClick={this.showConfirmation}
                    content="Delete Book List"
                />
                <Confirm
                    open={this.state.open}
                    header="Please Confirm"
                    content="Are you sure you want to delete this book list? All of the books on the book list will also be deleted."
                    confirmButton="Delete"
                    onCancel={this.handleCancel}
                    onConfirm={this.handleBookListRemove}
                /> */}
            </div>
        )
    }
}

export default connect(null, { removeBookList })(BookListPreview)