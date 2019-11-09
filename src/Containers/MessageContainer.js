import React from 'react'
import Message from '../components/Message'
import New from '../components/New'
import { Comment, Header } from 'semantic-ui-react'
import { ActionCableConsumer } from 'react-actioncable-provider'
import { connect } from 'react-redux'
import { receiveMessage } from '../actions'

class MessageContainer extends React.Component {
    componentDidMount() {
        //fetch book club id so will get most recent messages
        // fetch(`http://localhost:3001/api/v1/book_clubs/${this.props.match.params.id}`, {
        //     headers: {
        //         "Authorization": `Bearer ${localStorage.token}`
        //     }
        // })
        // .then(resp => resp.json())
        // .then(response => {
        //     console.log(response)
        // })
    }

    render() {
        const bookClubId = parseInt(this.props.match.params.id)
        const bookClubObj = this.props.bookClubs.find(bookClub => bookClub.id === bookClubId)    
        return (
            <div>
                <New type="Message" bookClub={bookClubObj} />
                <br/><br/>
                <Comment.Group className="message-container">
                    <Header as='h3' dividing content="Messages" />
                    {bookClubObj.messages.map(message => <Message key={message.id} {...message} />)}
                </Comment.Group>
                <ActionCableConsumer
                    channel={{ channel: "BookClubChannel", book_club_id: bookClubObj.id }}
                    onReceived={data => this.props.receiveMessage(data)}
                />
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        bookClubs: state.bookClubReducer.bookClubs,
    }
}

export default connect(mapStateToProps, { receiveMessage })(MessageContainer)