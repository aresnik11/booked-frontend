import {
    SET_CURRENT_USER,
    LOG_OUT,
    ADD_BOOK_LIST
} from '../types'

const defaultState = {
    currentUser: null,
    bookLists: [],
    authors: []
}

function userReducer(state = defaultState, action) {
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload.currentUser,
                bookLists: action.payload.bookLists,
                authors: action.payload.authors
            }
        case LOG_OUT:
            return {...state, currentUser: null}
        case ADD_BOOK_LIST:
            return {...state, bookLists: [...state.bookLists, action.payload]}
        default:
            return state
    }
}

export default userReducer