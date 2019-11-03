import {
    FETCH_SEARCHED_BOOKS,
    ADD_BOOK_LIST,
    SET_CURRENT_USER,
    LOG_OUT
} from './types'

function fetchSearchedBooks({ search, type }) {
    return function(dispatch) {
        fetch('http://localhost:3001/api/v1/search', {
            headers: {
                "Search-Term": `${search}`,
                "Search-Type": `${type}`,
                "Authorization": `Bearer ${localStorage.token}`
            }
        })
        .then(resp => resp.json())
        .then(response => {
            if (response.errors) {
                alert(response.errors)
            }
            else {
                dispatch({
                    type: FETCH_SEARCHED_BOOKS,
                    payload: {
                        totalItems: response.totalItems,
                        searchedBooks: response.books
                    }
                })
            }
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
        .then(response => {
            if (response.errors) {
                alert(response.errors)
            }
            else {
                dispatch({
                    type: ADD_BOOK_LIST,
                    payload: response
                })
            }
        })
    }
}

function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        payload: {
            currentUser: {
                id: user.id,
                username: user.username
            },
            bookLists: user.book_lists,
            authors: user.authors
        }
    }
}

function logOut() {
    return {
        type: LOG_OUT
    }
}

export {
    fetchSearchedBooks,
    addBookList,
    setCurrentUser,
    logOut
}