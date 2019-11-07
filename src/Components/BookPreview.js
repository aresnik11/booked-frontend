import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { removeBookListBook } from '../actions'

const BookPreview = (props) => {
    return (
        <div>
            <div className="component">
                <ul className="align">
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
                                    {/* if there is a bookListObj prop, link to book with id (from book list) and pass bookListObj in state, otherwise link to book with volume_id (from search) */}
                                    {props.bookListObj
                                    ?
                                    <Link
                                        to={{
                                        pathname: `/books/${props.id}`,
                                        state: { bookListObj: props.bookListObj }
                                    }}>
                                        <button className="btn">View Book</button>
                                    </Link>
                                    :
                                    <Link to={{
                                        pathname: `/books/${props.volume_id}`,
                                        state: { fromSearch: true }
                                    }}>
                                        <button className="btn">View Book</button>
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
            </div>
            {/* if there is a bookListObj prop, link to book with id (from book list) and pass bookListObj in state, otherwise link to book with volume_id (from search) */}
            {props.bookListObj
            ?
            <button className="btn" onClick={() => props.removeBookListBook(props.id, props.bookListObj.id)}>Remove from book list</button>
            : null}
        </div>
    )
}

export default connect(null, { removeBookListBook })(BookPreview)