import {
    SET_CURRENT_USER,
    LOG_OUT,
    ADD_BOOK_LIST,
    ADD_BOOK_LIST_BOOK,
    REMOVE_BOOK_LIST_BOOK
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
        case ADD_BOOK_LIST_BOOK:
            const copyBookLists = [...state.bookLists]
            //finding the booklist from action.payload.response
            const foundBookList = copyBookLists.find(bookList => bookList.id === action.payload.response.book_list_id)
            //add a book to that booklist, from action.payload.book
            foundBookList.books = [...foundBookList.books, action.payload.book]
            return {
                ...state,
                bookLists: copyBookLists
            }
        case REMOVE_BOOK_LIST_BOOK:
            const bookListsCopy = [...state.bookLists]
            //finding the booklist from action.payload
            const tagetBookList = bookListsCopy.find(bookList => bookList.id === action.payload.book_list_id)
            //remove the book from action.payload from that booklist
            tagetBookList.books = tagetBookList.books.filter(book => book.id !== action.payload.book_id)
            return {
                ...state,
                bookLists: bookListsCopy
            }
        default:
            return state
    }
}

export default userReducer