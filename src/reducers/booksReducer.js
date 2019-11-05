import {
    FETCH_SEARCHED_BOOKS,
    SET_LOADING
} from '../types'

const defaultState = {
    searchedBooks: [],
    totalItems: "",
    loading: false
}

function booksReducer(state = defaultState, action) {
    switch(action.type) {
        case FETCH_SEARCHED_BOOKS:
            return {
                ...state,
                totalItems: action.payload.totalItems,
                searchedBooks: action.payload.searchedBooks,
                loading: false
            }
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state
    }
}

export default booksReducer