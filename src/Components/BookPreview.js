import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { removeBookListBook } from '../actions'
import { Button } from 'semantic-ui-react'

const BookPreview = (props) => {
    return (
        <div className="book-container">
            {/* https://codepen.io/fivera/pen/rHigj */}
            <ul>
                <li>
                    <figure className='book'>

                        {/* Front */}

                        <ul className='hardcover_front'>
                            <li>
                                <img src={props.image} alt="" />
                            </li>
                            <li></li>
                        </ul>

                        {/* Pages */}
                    
                        <ul className='page'>
                            <li></li>
                            <li>
                                {/* if there is a bookListId prop, link to book with id (from book list), otherwise link to book with volume_id (from search) */}
                                {props.bookListId
                                ?
                                <Link
                                    to={{
                                    pathname: `/books/${props.id}`,
                                    state: { fromSearch: false }
                                }}>
                                    <div className="book-preview-page">
                                        <Button className="btn" content="View Book" />
                                    </div>
                                </Link>
                                :
                                <Link to={{
                                    pathname: `/books/${props.volume_id}`,
                                    state: { fromSearch: true }
                                }}>
                                    <div className="book-preview-page">
                                        <Button className="btn" content="View Book" />
                                    </div>
                                </Link>}
                            </li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>

                        {/* Back */}

                        <ul className='hardcover_back'>
                            <li></li>
                            <li></li>
                        </ul>
                        <ul className='book_spine'>
                            <li></li>
                            <li></li>
                        </ul>
                    </figure>
                </li>
            </ul>
            {/* if there is a bookListId prop, we're on a booklist show page so include button to remove book from book list */}
            {props.bookListId
            ?
            <>
                <br/>
                <Button
                    className="btn"
                    onClick={() => props.removeBookListBook(props.id, props.bookListId)}
                    content="Remove"
                />
            </>
            : null}
        </div>
    )
}

export default connect(null, { removeBookListBook })(BookPreview)