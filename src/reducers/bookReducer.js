import {
    FETCH_SEARCHED_BOOKS,
    SET_LOADING,
    FETCH_BOOK
} from '../types'

const defaultState = {
    searchedBooks: [],
    totalItems: null,
    loading: false,
    searchTerm: "",
    searchType: "",
    startIndex: 0,
    selectedBook: null,
}

function bookReducer(state = defaultState, action) {
    switch(action.type) {
        case FETCH_SEARCHED_BOOKS:
            let newSearchedBooks
            //if start index is 0, this is the initial fetch and totalSearchedBooks should only be the searchedBooks from the response (clear out any old fetch)
            if (action.payload.startIndex === 0) {
                newSearchedBooks = [...action.payload.searchedBooks]
            }
            //if it isn't 0, this is a refetch and we want to copy the existing arrray and add the new books from the fetch response
            else {
                newSearchedBooks = [...state.searchedBooks, ...action.payload.searchedBooks]
            }
            //sometimes getting back duplicate books (with the same volume id) when increasing startIndex, so filtering them out
            //do we care? maybe want to avoid this filter + map
            // const filteredTotalSearchedBooks = newSearchedBooks.filter((obj, pos, arr) => {
            //     return arr.map(mapObj => mapObj.volume_id).indexOf(obj.volume_id) === pos
            // })
            return {
                ...state,
                //total items coming back from the fetch
                totalItems: action.payload.totalItems,
                searchTerm: action.payload.searchTerm,
                searchType: action.payload.searchType,
                startIndex: action.payload.startIndex,
                searchedBooks: newSearchedBooks,
                loading: false
            }
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        case FETCH_BOOK:
            return {
                ...state,
                selectedBook: action.payload,
            }
        default:
            return state
    }
}

export default bookReducer