import React from 'react'

const Search = (props) => {
    return (
        <form>
            <label>Search:</label>
            <br/>
            <input type="search" name="search" placeholder="Search..." value={props.searchTerm} onChange={props.searchHandler} />
        </form>
    )
}

export default Search