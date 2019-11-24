import React from 'react'
import { Form } from 'semantic-ui-react'

const Search = (props) => {
    return (
        <>
            <h4>Search {props.type}</h4>
            <Form className="small-input">
                <Form.Input
                    type="search"
                    icon="search"
                    name="search"
                    placeholder="Search..."
                    value={props.searchTerm}
                    onChange={props.searchHandler}
                />
            </Form>
        </>
    )
}

export default Search