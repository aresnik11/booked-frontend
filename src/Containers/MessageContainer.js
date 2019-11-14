import React from 'react'
import withAuth from '../withAuth'
import Search from '../components/Search'
import New from '../components/New'
import NewMessage from '../components/NewMessage'
import BookClubPreview from '../components/BookClubPreview'
import Delete from '../components/Delete'
import Message from '../components/Message'
import Loading from '../components/Loading'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchBookClubs, receiveMessage } from '../actions'
import { Comment, Grid } from 'semantic-ui-react'
import { ActionCableConsumer } from 'react-actioncable-provider'

class MessageContainer extends React.Component {
    myRef = React.createRef()

    componentDidMount() {
        // this.scrollDown()
        // if (this.myRef.current) {
            this.scrollDown()
        // }
    }

    // componentDidUpdate() {
    //     if (this.myRef.current) {
    //         this.scrollDown()
    //     }
    // }

    // scrolls down the chat container so user sees the most recent messages
    scrollDown = () => {
        console.log(this.myRef)
        // const chat = document.querySelector('.ui.comments')
        // chat.scrollTop = chat.scrollHeight - 389
        this.myRef.current.scrollIntoView({ behavior: "smooth", block: "end" })
    }

    render() {
        return (
            <>
                <Switch>
                    <Route exact path="/bookclubs/:id" render={(routerProps) => {
                        //find the bookclub that matches this id from all bookclubs
                        const bookClubId = parseInt(routerProps.match.params.id)
                        const bookClubObj = this.props.bookClubs.find(bookClub => bookClub.id === bookClubId)
                        // only render BookClubShow component if we found the book club object
                        if (bookClubObj) {
                            return (
                                <div className="message-container">
                                    <div className="message-header">
                                        <h1>{bookClubObj.name}</h1>
                                        <Delete type="Book Club" id={bookClubObj.id} />
                                    </div>
                                    <ActionCableConsumer
                                        channel={{ channel: "MessagesChannel", book_club_id: bookClubObj.id }}
                                        onReceived={data => {
                                            if (data.type === "RECEIVE_MESSAGE") {
                                                this.props.receiveMessage(data.payload)
                                                this.scrollDown()
                                            }
                                        }}
                                    />
                                    <Comment.Group>
                                        {bookClubObj.messages.map(message => <Message key={message.id} {...message} />)}
                                        <div ref={this.myRef} />
                                    </Comment.Group>
                                    <NewMessage bookClubId={bookClubObj.id} />
                                </div>
                            )
                        }
                        // if we couldn't find the book club object, redirect to /error, which will render the Error component
                        else {
                            return <Redirect to="/error" />
                        }
                    }}/>
                    {/* if we didn't match either path, redirect to error */}
                    <Redirect to="/error" />
                </Switch>
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        bookClubs: state.bookClubReducer.bookClubs,
        loading: state.bookClubReducer.loading
    }
}

export default connect(mapStateToProps, { fetchBookClubs, receiveMessage })(withAuth(MessageContainer))