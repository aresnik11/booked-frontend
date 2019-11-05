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
                    <div class="component">
                        <ul class="align">
                            <li>
                                <figure class='book'>

                                    {/* Front */}

                                    <ul class='hardcover_front'>
                                        <li>
                                            <img src={props.image} alt="" />
                                        </li>
                                        <li></li>
                                    </ul>

                                    {/* Pages */}

                                    <ul class='page'>
                                        <li></li>
                                        <li>
                                            <a class="btn" href="#">Download</a>
                                        </li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                    </ul>

                                    {/* Back */}

                                    <ul class='hardcover_back'>
                                        <li></li>
                                        <li></li>
                                    </ul>
                                    <ul class='book_spine'>
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