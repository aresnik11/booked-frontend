import React from 'react'
import withAuth from '../components/withAuth'
import NewMessage from '../components/NewMessage'
import Delete from '../components/Delete'
import Message from '../components/Message'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchBookClubs, receiveMessage } from '../actions'
import { Comment } from 'semantic-ui-react'
import { ActionCableConsumer } from 'react-actioncable-provider'

class MessageContainer extends React.Component {
    messagesEnd = React.createRef()

    componentDidMount() {
        // only scrolls down if our ref is not null
        if (this.messagesEnd.current) {
            this.scrollDown()
        }
    }

    // scrolls down the bottom of the message container so user sees the most recent messages
    scrollDown = () => {
        this.messagesEnd.current.scrollIntoView({
            behavior: "smooth",
            block: "end"
        })
    }

    // creates a message component for each message in this book clubs messages
    makeMessages = (bookClubObj) => {
        return bookClubObj.messages.map(message => <Message key={message.id} {...message} />)
    }

    render() {
        //find the bookclub that matches this id from all bookclubs
        const bookClubId = parseInt(this.props.match.params.id)
        const bookClubObj = this.props.bookClubs.find(bookClub => bookClub.id === bookClubId)
        // only render BookClubShow component if we found the book club object
        if (bookClubObj) {
            return (
                <div className="message-container">
                    {/* book club header - name and delete button */}
                    <div className="message-header">
                        <h1>{bookClubObj.name}</h1>
                        <Delete type="Book Club" id={bookClubObj.id} />
                    </div>

                    {/* messages */}
                    <Comment.Group>
                        {this.makeMessages(bookClubObj)}
                        {/* reference to the end of the messages contianer so we can autoscroll down to it */}
                        <div ref={this.messagesEnd} />
                    </Comment.Group>

                    <NewMessage bookClubId={bookClubObj.id} />

                    {/* listening for updates to messages channel from backend */}
                    <ActionCableConsumer
                        channel={{ channel: "MessagesChannel", book_club_id: bookClubObj.id }}
                        onReceived={data => {
                            // if receive message, update redux store to add new message and scroll down
                            if (data.type === "RECEIVE_MESSAGE") {
                                this.props.receiveMessage(data.payload)
                                this.scrollDown()
                            }
                        }}
                    />
                </div>
            )
        }
        // if we couldn't find the book club object, redirect to /error, which will render the Error component
        else {
            return <Redirect to="/error" />
        }
    }
}

function mapStateToProps(state) {
    return {
        bookClubs: state.bookClubReducer.bookClubs,
    }
}

export default connect(mapStateToProps, { fetchBookClubs, receiveMessage })(withAuth(MessageContainer))