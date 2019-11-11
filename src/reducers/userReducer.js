import {
    SET_CURRENT_USER,
    LOG_OUT,
    FETCH_USERS,
    LOG_IN_ERROR,
    SIGN_UP_ERROR
} from '../types'

const defaultState = {
    currentUser: null,
    logInError: false,
    signUpError: false,
    users: [],
}

function userReducer(state = defaultState, action) {
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                //object with id and username keys
                currentUser: action.payload.currentUser,
                logInError: false,
                signUpError: false
            }
        case LOG_OUT:
            return {
                ...state,
                currentUser: null
            }
        case LOG_IN_ERROR:
            return {
                ...state,
                logInError: action.payload
            }
        case SIGN_UP_ERROR:
            return {
                ...state,
                signUpError: action.payload
            }
        case FETCH_USERS:
            // filtering the current user out of the array of all users (from action.payload)
            const allUsersExceptCurrentUser = action.payload.filter(user => user.id !== state.currentUser.id)
            return {
                ...state,
                users: allUsersExceptCurrentUser
            }
        default:
            return state
    }
}

export default userReducer