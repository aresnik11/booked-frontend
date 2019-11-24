import {
    ADD_BOOK_LIST,
    ADD_BOOK_LIST_ERROR,
    ADD_BOOK_LIST_BOOK,
    ADD_BOOK_LIST_BOOK_ERROR,
    REMOVE_BOOK_LIST_BOOK,
    REMOVE_BOOK_LIST
} from './types'

function addBookList(newBookList) {
    return function(dispatch) {
        fetch("https://booked-backend.herokuapp.com/api/v1/book_lists", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(newBookList)
        })
        .then(resp => resp.json())
        .then(response => {
            if (response.errors) {
                dispatch({
                    type: ADD_BOOK_LIST_ERROR,
                    payload: response.errors
                })
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

function addBookListBook(book, bookListId) {
    return function(dispatch) {
        fetch("https://booked-backend.herokuapp.com/api/v1/book_list_books", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                book_id: book.id,
                book_list_id: bookListId
            })
        })
        .then(resp => resp.json())
        .then(response => {
            if (response.errors) {
                dispatch({
                    type: ADD_BOOK_LIST_BOOK_ERROR,
                    payload: response.errors
                })
            }
            else {
                dispatch({
                    type: ADD_BOOK_LIST_BOOK,
                    payload: {
                        response: response,
                        book: book
                    }
                })
            }
        })
    }
}

function removeBookListBook(bookId, bookListId) {
    return function(dispatch) {
        fetch("https://booked-backend.herokuapp.com/api/v1/book_list_books", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                book_id: bookId,
                book_list_id: bookListId
            })
        })
        .then(resp => resp.json())
        .then(response => {
            if (response.errors) {
                alert(response.errors)
            }
            else {
                dispatch({
                    type: REMOVE_BOOK_LIST_BOOK,
                    payload: response
                })
            }
        })
    }
}

function removeBookList(bookListId) {
    return function(dispatch) {
        return fetch(`https://booked-backend.herokuapp.com/api/v1/book_lists/${bookListId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(resp => resp.json())
        .then(response => {
            if (response.errors) {
                alert(response.errors)
            }
            else {
                dispatch({
                    type: REMOVE_BOOK_LIST,
                    payload: response
                })
            }
        })
    }
}

export {
    addBookList,
    addBookListBook,
    removeBookListBook,
    removeBookList
}