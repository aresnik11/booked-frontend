import {
    LOG_IN_ERROR,
    SIGN_UP_ERROR,
    PLEASE_LOG_IN,
    SET_CURRENT_USER,
    LOG_OUT,
    FETCH_USERS
} from './types'

function removeAccount() {
    return function(dispatch) {
        fetch("https://booked-backend.herokuapp.com/api/v1/users", {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
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
        fetch("https://booked-backend.herokuapp.com/api/v1/users", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
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

function autoLogin() {
    return function(dispatch) {
        fetch("https://booked-backend.herokuapp.com/api/v1/auto_login", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(resp => resp.json())
        .then(response => {
            if (response.errors) {
                localStorage.removeItem("token")
                dispatch({
                    type: LOG_OUT
                })
            }
            else {
                dispatch({
                    type: SET_CURRENT_USER,
                    payload: {
                        currentUser: {
                            id: response.user.id,
                            username: response.user.username
                        },
                        bookLists: response.user.book_lists
                    }
                })
            }
        })
    }
}

function signUp(user) {
    return function (dispatch) {
        return fetch("https://booked-backend.herokuapp.com/api/v1/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({user: user})
        })
        .then(resp => resp.json())
        .then(response => {
            if (response.errors) {
                dispatch({
                    type: SIGN_UP_ERROR,
                    payload: response.errors
                })
            }
            else {
                localStorage.setItem("token", response.token)
                dispatch({
                    type: SET_CURRENT_USER,
                    payload: {
                        currentUser: {
                            id: response.user.id,
                            username: response.user.username
                        },
                        bookLists: response.user.book_lists
                    }
                })
            }
        })
    }
}

function logIn(user) {
    return function (dispatch) {
        return fetch("https://booked-backend.herokuapp.com/api/v1/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({user: user})
        })
        .then(resp => resp.json())
        .then(response => {
            if (response.errors) {
                dispatch({
                    type: LOG_IN_ERROR,
                    payload: response.errors
                })
            }
            else {
                localStorage.setItem("token", response.token)
                dispatch({
                    type: SET_CURRENT_USER,
                    payload: {
                        currentUser: {
                            id: response.user.id,
                            username: response.user.username
                        },
                        bookLists: response.user.book_lists
                    }
                })
            }
        })
    }
}

function removeLogInError() {
    return {
        type: LOG_IN_ERROR,
        payload: false
    }
}

function pleaseLogIn() {
    return {
        type: PLEASE_LOG_IN,
        payload: "Please log in to view other pages"
    }
}

function removePleaseLogin() {
    return {
        type: PLEASE_LOG_IN,
        payload: false
    }
}

export {
    removeAccount,
    setCurrentUser,
    logOut,
    fetchUsers,
    autoLogin,
    signUp,
    logIn,
    removeLogInError,
    pleaseLogIn,
    removePleaseLogin
}