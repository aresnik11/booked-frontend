import React from 'react'
import { Form } from 'semantic-ui-react'

const Search = (props) => {
    return (
        <div>
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
        </div>
    )
}

export default Search