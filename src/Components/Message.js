import React from 'react'
import { Comment } from 'semantic-ui-react'
import * as moment from 'moment'

const Message = (props) => {
    return (
        <Comment>
            <Comment.Content>
                <Comment.Author content={props.user.username} />
                <Comment.Metadata content={moment(props.created_at).format("M/D h:mma")} />
                <Comment.Text content={props.content} />
            </Comment.Content>
        </Comment>

    )
}

export default Message


