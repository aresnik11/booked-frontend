import {
    FETCH_SEARCHED_BOOKS
} from '../types'

const defaultState = {
    searchedBooks: [],
    totalItems: "",
    loading: true
}

function booksReducer(state = defaultState, action) {
    switch(action.type) {
        case FETCH_SEARCHED_BOOKS:
            return {...state, totalItems: action.payload.totalItems, searchedBooks: action.payload.searchedBooks, loading: false}
        default:
            return state
    }
}

export default booksReducer