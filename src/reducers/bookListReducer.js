import {
    SET_CURRENT_USER,
    LOG_OUT,
    ADD_BOOK_LIST,
    ADD_BOOK_LIST_ERROR,
    ADD_BOOK_LIST_BOOK,
    ADD_BOOK_LIST_BOOK_ERROR,
    FETCH_BOOK,
    REMOVE_BOOK_LIST_BOOK,
    REMOVE_BOOK_LIST,
} from '../actions/types'

const defaultState = {
    bookLists: [],
    bookListError: false,
    addError: false
}

function bookListReducer(state = defaultState, action) {
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                // array of bookList objects, each bookList object contains id, name, and books, which is an array of book objects
                bookLists: action.payload.bookLists
            }
        case LOG_OUT:
            // resets book lists on log out
            return {
                ...state,
                bookLists: []
            }
        case ADD_BOOK_LIST:
            return {
                ...state,
                bookLists: [...state.bookLists, action.payload],
                bookListError: false
            }
        case ADD_BOOK_LIST_ERROR:
            return {
                ...state,
                bookListError: action.payload
            }
        case ADD_BOOK_LIST_BOOK:
            const copyBookLists = [...state.bookLists]
            // finding the booklist from action.payload.response
            const foundBookList = copyBookLists.find(bookList => bookList.id === action.payload.response.book_list_id)
            // add a book to that booklist, from action.payload.book
            foundBookList.books = [...foundBookList.books, action.payload.book]
            return {
                ...state,
                bookLists: copyBookLists,
                addError: false
            }
        case ADD_BOOK_LIST_BOOK_ERROR:
            return {
                ...state,
                addError: action.payload
            }
        case FETCH_BOOK:
            // resets add error if we fetch another book
            return {
                ...state,
                addError: false,
            }
        case REMOVE_BOOK_LIST_BOOK:
            const bookListsCopy = [...state.bookLists]
            // finding the booklist from action.payload
            const targetBookList = bookListsCopy.find(bookList => bookList.id === action.payload.book_list_id)
            // remove the book from action.payload from that booklist
            targetBookList.books = targetBookList.books.filter(book => book.id !== action.payload.book_id)
            return {
                ...state,
                bookLists: bookListsCopy
            }
        case REMOVE_BOOK_LIST:
            const copyBL = [...state.bookLists]
            // remove the booklist from action.payload from the list of booklists
            const filteredBookLists = copyBL.filter(bookList => bookList.id !== action.payload.id)
            return {
                ...state,
                bookLists: filteredBookLists
            }
        default:
            return state
    }
}

export default bookListReducer