const defaultState = {
    searchedBooks: [],
    totalItems: ""
}

function searchBooksReducer(state = defaultState, action) {
    switch(action.type) {
        case "FETCH_SEARCHED_BOOKS":
            return {...state, totalItems: action.payload.totalItems, searchedBooks: action.payload.searchedBooks}
        default:
            return state
    }
}

export default searchBooksReducer