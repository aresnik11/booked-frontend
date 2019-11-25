import {
    SET_CURRENT_USER,
    LOG_OUT,
    FETCH_USERS,
    LOG_IN_ERROR,
    SIGN_UP_ERROR,
    PLEASE_LOG_IN,
    DEMO_LOG_IN_ERROR
} from '../actions/types'

const defaultState = {
    currentUser: null,
    logInError: false,
    signUpError: false,
    pleaseLogIn: false,
    demoLogInError: false,
    users: [],
    loading: true
}

function userReducer(state = defaultState, action) {
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                //object with id and username keys
                currentUser: action.payload.currentUser,
                // resets all errors back to false since successful signed in
                logInError: false,
                signUpError: false,
                pleaseLogIn: false,
                demoLogInError: false
            }
        case LOG_OUT:
            return {
                ...state,
                currentUser: null
            }
        case LOG_IN_ERROR:
            return {
                ...state,
                logInError: action.payload,
                // resets all other errors to false since only want to show one error
                signUpError: false,
                pleaseLogIn: false,
                demoLogInError: false
            }
        case SIGN_UP_ERROR:
            return {
                ...state,
                signUpError: action.payload,
                // resets all other errors to false since only want to show one error
                logInError: false,
                pleaseLogIn: false,
                demoLogInError: false
            }
        case PLEASE_LOG_IN:
            // called if someone tries to go to any pages other than homepage, login, and signup while not logged in
            return {
                ...state,
                pleaseLogIn: action.payload,
                // resets all other errors to false since only want to show one error
                logInError: false,
                signUpError: false,
                demoLogInError: false
            }
        case FETCH_USERS:
            // filtering the current user out of the array of all users (from action.payload)
            const allUsersExceptCurrentUser = action.payload.filter(user => user.id !== state.currentUser.id)
            return {
                ...state,
                users: allUsersExceptCurrentUser,
                loading: false
            }
        case DEMO_LOG_IN_ERROR:
            return {
                ...state,
                demoLogInError: action.payload,
                // resets all other errors to false since only want to show one error
                logInError: false,
                signUpError: false,
                pleaseLogIn: false
            }
        default:
            return state
    }
}

export default userReducer