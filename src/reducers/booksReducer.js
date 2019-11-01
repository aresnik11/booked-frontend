import { FETCH_SEARCHED_BOOKS, ADD_BOOK_LIST, FETCH_BOOK_LISTS } from '../types'

const defaultState = {
    searchedBooks: [],
    totalItems: "",
    bookLists: [],
    loading: true
}

function booksReducer(state = defaultState, action) {
    switch(action.type) {
        case FETCH_SEARCHED_BOOKS:
            return {...state, totalItems: action.payload.totalItems, searchedBooks: action.payload.searchedBooks, loading: false}
        case ADD_BOOK_LIST:
            return {...state, bookLists: [...state.bookLists, action.payload], loading: false}
        case FETCH_BOOK_LISTS:
            return {...state, bookLists: action.payload, loading: false}
        default:
            return state
    }
}

export default booksReducer