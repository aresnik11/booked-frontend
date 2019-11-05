import {
    FETCH_SEARCHED_BOOKS,
    SET_LOADING
} from '../types'

const defaultState = {
    searchedBooks: [],
    totalItems: 0,
    loading: false,
    loadedItems: 0,
    hasMoreItems: false
}

function booksReducer(state = defaultState, action) {
    switch(action.type) {
        case FETCH_SEARCHED_BOOKS:
            // let loadedItems = state.loadedItems
            // let hasMoreItems = state.hasMoreItems
            // if (action.payload.searchedBooks) {
            //     loadedItems = action.payload.searchedBooks.length
            //     hasMoreItems = action.payload.totalItems > action.payload.searchedBooks.length
            // }
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