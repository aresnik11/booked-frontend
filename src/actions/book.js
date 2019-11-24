import {
    FETCH_SEARCHED_BOOKS,
    SET_LOADING,
    FETCH_BOOK
} from './types'

function fetchSearchedBooks({ search, type, index }) {
    return function(dispatch) {
        fetch("http://localhost:3001/api/v1/search", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Search-Term": search,
                "Search-Type": type,
                "Start-Index": index
            }
        })
        .then(resp => resp.json())
        .then(response => {
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
        })
    }
}

function setLoading() {
    return {
        type: SET_LOADING
    }
}

function fetchBook(bookId) {
    return function(dispatch) {
        fetch(`http://localhost:3001/api/v1/books/${bookId}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
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

function fetchBookByVolumeId(bookId) {
    return function(dispatch) {
        fetch(`http://localhost:3001/api/v1/find_by_volume/${bookId}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
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

function resetSelectedBook() {
    return {
        type: FETCH_BOOK,
        payload: null
    }
}

export {
    fetchSearchedBooks,
    setLoading,
    fetchBook,
    fetchBookByVolumeId,
    resetSelectedBook
}