import React from 'react'
import { connect } from 'react-redux'

const NumResults = (props) => {
    return (
        <div>
            {/* only show number of search results if totalItems isn't empty */}
            {props.totalItems !== "" ? <h3>{props.totalItems} search results</h3> : null}
        </div>
    )
}

function mapStateToProps(state) {
    return {
        totalItems: state.booksReducer.totalItems
    }
}

export default connect(mapStateToProps)(NumResults)