import { FETCH_SEARCHED_BOOKS, ADD_BOOK_LIST, FETCH_BOOK_LISTS } from './types'

function fetchSearchedBooks({ search, type }) {
    return function(dispatch) {
        fetch('http://localhost:3001/api/v1/search', {
            headers: {
                "Search-Term": `${search}`,
                "Search-Type": `${type}`
            }
        })
        .then(resp => resp.json())
        .then(data => {
            dispatch({
                type: FETCH_SEARCHED_BOOKS,
                payload: {
                    totalItems: data.totalItems,
                    searchedBooks: data.books
                }
            })
        })
    }
}

function addBookList(newBookList) {
    return function(dispatch) {
        fetch('http://localhost:3001/api/v1/book_lists', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(newBookList)
        })
        .then(resp => resp.json())
        .then(data => {
            if (data.errors) {
                alert(data.errors)
            }
            else {
                dispatch({
                    type: ADD_BOOK_LIST,
                    payload: data
                })
            }
        })
    }
}

function fetchBookLists() {
    return function(dispatch) {
        fetch('http://localhost:3001/api/v1/book_lists')
        .then(resp => resp.json())
        .then(data => {
            dispatch({
                type: FETCH_BOOK_LISTS,
                payload: data
            })
        })
    }
}

export {
    fetchBookLists,
    fetchSearchedBooks,
    addBookList
}