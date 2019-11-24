import {
    FETCH_BOOK_CLUBS,
    ADD_BOOK_CLUB,
    ADD_BOOK_CLUB_ERROR,
    REMOVE_BOOK_CLUB,
    RECEIVE_MESSAGE,
    MESSAGE_ERROR
} from './types'

function fetchBookClubs() {
    return function(dispatch) {
        fetch("http://localhost:3001/api/v1/book_clubs", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
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
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(newBookClub)
        })
        .then(resp => resp.json())
        .then(response => {
            if (response.errors) {
                dispatch({
                    type: ADD_BOOK_CLUB_ERROR,
                    payload: response.errors
                })
            }
        })
    }
}

function removeBookClub(bookClubId) {
    return function(dispatch) {
        return fetch(`http://localhost:3001/api/v1/book_clubs/${bookClubId}`, {
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
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(newMessage)
        })
        .then(resp => resp.json())
        .then(response => {
            if (response.errors) {
                dispatch({
                    type: MESSAGE_ERROR,
                    payload: response.errors
                })
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
    fetchBookClubs,
    addBookClub,
    removeBookClub,
    addMessage,
    receiveMessage,
    receiveAddBookClub,
    receiveRemoveBookClub
}