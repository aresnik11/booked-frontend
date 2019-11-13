import React from 'react'
import { Grid, Image } from 'semantic-ui-react'

const BookShow = (props) => {
    return (
        <>
            <Grid.Column width={5}>
                <div className="book-show content">
                    <Image alt={props.title} src={props.image} className="image-show" />
                    <br/><br/>
                    <div>
                        {props.author ? <h3>Written by {props.author}</h3> : null}
                        {props.publisher ? <h3>Published by {props.publisher}</h3> : null}
                        {props.published_date ? <h3>Published on {props.published_date}</h3> : null}
                        {props.page_count ? <h3>{props.page_count} pages</h3> : null}
                        {props.average_rating ? <h3>Average rating: {props.average_rating}</h3> : null}
                    </div>
                </div>
            </Grid.Column>
            <Grid.Column width={6}>
                <div className="book-show content">
                    <p>{props.description}</p>
                </div>
            </Grid.Column>
        </>
    )
}

export default BookShow