import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { removeBookListBook } from '../actions'

const BookPreview = (props) => {
    return (
        <div>
            {/* if there is a bookListObj prop, link to book with id (from book list) and pass bookListObj in state, otherwise link to book with volume_id (from search) */}
            {props.bookListObj
            ?
            <>
                <Link to={{
                    pathname: `/books/${props.id}`,
                    state: { bookListObj: props.bookListObj }
                }}>
                    {/* <h4>{props.title}</h4> */}
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
                                            <a className="btn" href="#">Download</a>
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
                                    <figcaption>
                                        <h1>Fivera.net</h1>
                                        <span>By Nikola Petrovic</span>
                                        <p>Website dedicated to sharing resources</p>
                                    </figcaption>
                                </figure>
                            </li>
                        </ul>
			</div>
                </Link>
                <button onClick={() => props.removeBookListBook(props.id, props.bookListObj.id)}>Remove from book list</button>
            </>
            :
            <Link to={{
                pathname: `/books/${props.volume_id}`,
                state: { fromSearch: true }
            }}>
                <h4>{props.title}</h4>
            </Link>
            }
        </div>
    )
}

export default connect(null, { removeBookListBook })(BookPreview)