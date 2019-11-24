import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import withAuth from '../helpers/withAuth'
import { Button } from 'semantic-ui-react'
import Delete from './Delete'

const Profile = (props) => {
    return (
        <>
            <h1>Welcome, {props.currentUser.username}</h1>
            <br/>
            <Link to="/booklists">
                <Button
                    color="black"
                    content="My Book Lists"
                />
            </Link>
            <br/><br/>
            <Link to="/search">
                <Button
                    color="black"
                    content="Search Books"
                />
            </Link>
            <br/><br/>
            <Link to="/bookclubs">
                <Button
                    color="black"
                    content="See Book Clubs"
                />
            </Link>
            <br/><br/>
            <Delete type="Account" />
        </>
    )
}

function mapStateToProps(state) {
    return {
        currentUser: state.userReducer.currentUser
    }
}

export default connect(mapStateToProps)(withAuth(Profile))