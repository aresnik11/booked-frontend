import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { removeBookList } from '../actions/bookList'
import Delete from './Delete'

const BookListPreview = (props) => {
    //returns a random number between 0 and n
    const getRandomNumber = (n) => {
        return Math.floor(Math.random() * n)
    }

    //randomizes class names so books on book shelf have different colors by random
    const getRandomColorClassName = () => {
        const classNameArray = ["bl-book bl-book-grey", "bl-book bl-book-blue", "bl-book bl-book-dark-grey", "bl-book bl-book-light-blue"]
        return classNameArray[getRandomNumber(classNameArray.length)]
    }

    const makeBookShelfBooks = () => {
        //book shelf code from https://codepen.io/kzf/pen/vEYVmL
        //if there are books in the booklist, make 5 books
        if (props.books.length) {
            const randomNum = getRandomNumber(5)
            return props.books.slice(0,5).map((book, index) => {
                //if this index matches our random number, make a tilted book with a random color and only show first 53 chars of title
                if (index === randomNum) {
                    return (
                        <div key={book.id} className="bl-book-tilted">
                            <div className={getRandomColorClassName()}>
                                <h3>{book.title.slice(0,53)}</h3>
                            </div>
                        </div>
                    )
                }
                //otherwise make a regular book with a random color and only show first 53 chars of title
                else {
                    return (
                        <div key={book.id} className={getRandomColorClassName()}>
                            <h3>{book.title.slice(0,53)}</h3>
                        </div>
                    )
                }
            })
        }
        //otherwise, make an empty book so bookshelf renders
        else {
            return (
                <div className="bl-book"></div>
            )
        }
    }

    return (
        <div className="bookshelf-container">
            {/* link to specific book list */}
            <Link to={`/booklists/${props.id}`}>
                <h3>{props.name}</h3>
                <div className="bookshelf">
                    {makeBookShelfBooks()}
                </div>
            </Link>
            <br/>
            {/* remove book list button */}
            <Delete type="Book List" id={props.id} />
        </div>
    )
}

export default connect(null, { removeBookList })(BookListPreview)