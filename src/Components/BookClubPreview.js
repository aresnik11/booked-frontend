import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { removeBookClub } from '../actions'

const BookClubPreview = (props) => {
    const handleBookClubRemove = () => {
        const response = window.confirm("Are you sure you want to delete this book club? All messages will also be deleted.")
        if (response) {
            props.removeBookClub(props.id)
        }
    }

    return (
        <div>
            <Link to={`/bookclubs/${props.id}`}>
                <h3>{props.name}</h3>
            </Link>
            <br/>
            <Button basic onClick={handleBookClubRemove} content="Delete Book Club" />
            <br/><br/>
        </div>
    )
}

export default connect(null, { removeBookClub })(BookClubPreview)