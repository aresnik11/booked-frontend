import {
    FETCH_SEARCHED_BOOKS,
    SET_LOADING,
    ADD_BOOK_LIST,
    ADD_BOOK_LIST_BOOK,
    REMOVE_BOOK_LIST_BOOK,
    REMOVE_BOOK_LIST,
    SET_CURRENT_USER,
    LOG_OUT,
    FETCH_USERS,
    FETCH_BOOK,
    FETCH_BOOK_CLUBS,
    ADD_BOOK_CLUB,
    REMOVE_BOOK_CLUB,
    RECEIVE_MESSAGE
} from './types'

//bookReducer

function fetchSearchedBooks({ search, type, index }) {
    return function(dispatch) {
        fetch("http://localhost:3001/api/v1/search", {
            headers: {
                "Authorization": `Bearer ${localStorage.token}`,
                "Search-Term": search,
                "Search-Type": type,
                "Start-Index": index
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
                        searchedBooks: response.books,
                        searchTerm: search,
                        searchType: type,
                        startIndex: index
                    }
                })
            }
        })
    }
}

function setLoading() {
    return {
        type: SET_LOADING
    }
}

//bookListReducer

function addBookList(newBookList) {
    return function(dispatch) {
        fetch("http://localhost:3001/api/v1/book_lists", {
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

function addBookListBook(book, bookListId) {
    return function(dispatch) {
        fetch("http://localhost:3001/api/v1/book_list_books", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            },
            body: JSON.stringify({
                book_id: book.id,
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
        fetch("http://localhost:3001/api/v1/book_list_books", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
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
        fetch(`http://localhost:3001/api/v1/book_lists/${bookListId}`, {
            method: "DELETE",
            headers: {
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
                    type: REMOVE_BOOK_LIST,
                    payload: response
                })
            }
        })
    }
}

//userReducer

function removeAccount() {
    return function(dispatch) {
        fetch("http://localhost:3001/api/v1/users", {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${localStorage.token}`
            }
        })
        .then(resp => resp.json())
        .then(dispatch({
                type: LOG_OUT
            })
        )
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
            bookLists: user.book_lists
        }
    }
}

function logOut() {
    return {
        type: LOG_OUT
    }
}

function fetchUsers() {
    return function(dispatch) {
        fetch("http://localhost:3001/api/v1/users", {
            headers: {
                "Authorization": `Bearer ${localStorage.token}`
            }
        })
        .then(resp => resp.json())
        .then(response => {
            dispatch({
                type: FETCH_USERS,
                payload: response
            })
        })
    }
}

function fetchBook(bookId) {
    return function(dispatch) {
        fetch(`http://localhost:3001/api/v1/books/${bookId}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.token}`
            }
        })
        .then(resp => resp.json())
        .then(response => {
            dispatch({
                type: FETCH_BOOK,
                payload: response
            })
        })
    }
}

//bookClubReduce

function fetchBookClubs() {
    return function(dispatch) {
        fetch("http://localhost:3001/api/v1/book_clubs", {
            headers: {
                "Authorization": `Bearer ${localStorage.token}`
            }
        })
        .then(resp => resp.json())
        .then(response => {
            dispatch({
                type: FETCH_BOOK_CLUBS,
                payload: response
            })
        })
    }
}

function addBookClub(newBookClub) {
    return function(dispatch) {
        fetch("http://localhost:3001/api/v1/book_clubs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(newBookClub)
        })
        .then(resp => resp.json())
        .then(response => {
            if (response.errors) {
                alert(response.errors)
            }
        })
    }
}

function removeBookClub(bookClubId) {
    return function(dispatch) {
        fetch(`http://localhost:3001/api/v1/book_clubs/${bookClubId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${localStorage.token}`
            }
        })
        .then(resp => resp.json())
        .then(response => {
            if (response.errors) {
                alert(response.errors)
            }
        })
    }
}

function addMessage(newMessage) {
    return function(dispatch) {
        fetch("http://localhost:3001/api/v1/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(newMessage)
        })
        .then(resp => resp.json())
        .then(response => {
            if (response.errors) {
                alert(response.errors)
            }
        })
    }
}

function receiveMessage(message) {
    return {
        type: RECEIVE_MESSAGE,
        payload: message
    }
}

function receiveAddBookClub(bookClub) {
    return {
        type: ADD_BOOK_CLUB,
        payload: bookClub
    }
}

function receiveRemoveBookClub(bookClub) {
    return {
        type: REMOVE_BOOK_CLUB,
        payload: bookClub
    }
}

export {
    fetchSearchedBooks,
    setLoading,
    addBookList,
    addBookListBook,
    removeBookListBook,
    removeBookList,
    removeAccount,
    setCurrentUser,
    logOut,
    fetchUsers,
    fetchBook,
    fetchBookClubs,
    addBookClub,
    removeBookClub,
    addMessage,
    receiveMessage,
    receiveAddBookClub,
    receiveRemoveBookClub
}