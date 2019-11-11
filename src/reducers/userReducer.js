import {
    SET_CURRENT_USER,
    LOG_OUT,
    FETCH_USERS,
    LOGIN_ERROR
} from '../types'

const defaultState = {
    currentUser: null,
    loginError: false,
    users: [],
}

function userReducer(state = defaultState, action) {
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                //object with id and username keys
                currentUser: action.payload.currentUser,
                loginError: false
            }
        case LOG_OUT:
            return {
                ...state,
                currentUser: null
            }
        case LOGIN_ERROR:
            return {
                ...state,
                loginError: true
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