import React from 'react'
import { Comment } from 'semantic-ui-react'

const Message = (props) => {
    return (
        // <div>
        //     <h4>{props.user_id} said {props.content} at {props.created_at}</h4>
        // </div>

        <Comment className="message">
            <Comment.Content>
                <Comment.Author as="a">{props.user.username}</Comment.Author>
                <Comment.Metadata>
                    <div>{props.created_at.slice(0,10)}</div>
                </Comment.Metadata>
                <Comment.Text>{props.content}</Comment.Text>
            </Comment.Content>
        </Comment>

    )
}

export default Message


