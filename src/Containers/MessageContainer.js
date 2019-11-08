import React from 'react'
import Message from '../components/Message'
import New from '../components/New'
import { Comment, Header } from 'semantic-ui-react'

const MessageContainer = (props) => {
    return (
        <div>
            <New type="Message" bookClub={props.bookClubObj} />
            <br/><br/>
            <Comment.Group className="message-container">
                <Header as='h3' dividing>
                    Comments
                </Header>
                {props.bookClubObj.messages.map(message => <Message key={message.id} {...message} />)}
            </Comment.Group>
            {/* <div>
                {props.bookClubObj.messages.map(message => <Message key={message.id} {...message} />)}
            </div> */}
        </div>
    )
}

export default MessageContainer