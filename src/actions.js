import {
    FETCH_SEARCHED_BOOKS,
    ADD_BOOK_LIST,
    ADD_BOOK_LIST_BOOK,
    SET_CURRENT_USER,
    LOG_OUT
} from './types'

function fetchSearchedBooks({ search, type }) {
    return function(dispatch) {
        fetch("http://localhost:3001/api/v1/search", {
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

// function addBook(book, bookListId) {
//     return function() {
//         fetch("http://localhost:3001/api/v1/books", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Accept": "application/json",
//                 "Authorization": `Bearer ${localStorage.token}`
//             },
//             body: JSON.stringify(book)
//         })
//         .then(resp => resp.json())
//         .then(response => {
//             console.log("repsonse from book post", response)
//             if (response.errors) {
//                 alert(response.errors)
//             }
//             else {
//                 addBookListBook(response, bookListId)
//             }
//         })
//     }
// }

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
            console.log("repsonse from book list book post", response)
            console.log("book", book)
            if (response.errors) {
                alert(response.errors)
            }
            else {
                //need to do something here
                //update bookLists.books in state
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
    addBookListBook,
    logOut
}