import React from 'react'
import { Grid, Image } from 'semantic-ui-react'

const BookShow = (props) => {
    return (
        <div>
            <h3>Written by {props.author}</h3>
            <h3>Published by {props.publisher}</h3>
            <h3>Published on {props.published_date}</h3>
            <h3>{props.page_count} pages</h3>
            <h3>Average rating: {props.average_rating}</h3>
        </div>
        // <div className="book-show-container">
            // <a href={props.url} target="_blank" rel="noopener noreferrer">
            //     <div className="book-show">
            //         <h1>{props.title}</h1>
            //         <Grid>
            //             <Grid.Column width={6} className="image-show">
            //                 <Image alt={props.title} src={props.image} />
            //             </Grid.Column>
            //             <Grid.Column width={10} className="left-text">
            //                 <h3>{props.subtitle ? props.subtitle : null}</h3>
            //                 <h3>{props.author}</h3>
            //                 <h3>Average rating: {props.average_rating}</h3>
            //                 <h3>{props.page_count} pages</h3>
            //                 <h3>Published on {props.published_date}</h3>
            //                 <h3>Published by {props.publisher}</h3>
            //                 <p>{props.description}</p>
            //             </Grid.Column>
            //         </Grid>
            //     </div>
            // </a>
        // </div>
    )
}

export default BookShow