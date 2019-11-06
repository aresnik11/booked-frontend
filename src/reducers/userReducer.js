import {
    SET_CURRENT_USER,
    LOG_OUT,
    ADD_BOOK_LIST,
    ADD_BOOK_LIST_BOOK,
    REMOVE_BOOK_LIST_BOOK,
    REMOVE_BOOK_LIST,
    FETCH_USERS
} from '../types'

const defaultState = {
    currentUser: null,
    bookLists: [],
    users: [],
}

function userReducer(state = defaultState, action) {
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                //object with id and username keys
                currentUser: action.payload.currentUser,
                //array of bookList objects, each bookList object contains id, name, and books, which is an array of book objects
                bookLists: action.payload.bookLists
            }
        case LOG_OUT:
            return {
                ...state,
                currentUser: null,
                bookLists: []
            }
        case ADD_BOOK_LIST:
            return {
                ...state,
                bookLists: [...state.bookLists, action.payload]
            }
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
            const targetBookList = bookListsCopy.find(bookList => bookList.id === action.payload.book_list_id)
            //remove the book from action.payload from that booklist
            targetBookList.books = targetBookList.books.filter(book => book.id !== action.payload.book_id)
            return {
                ...state,
                bookLists: bookListsCopy
            }
        case REMOVE_BOOK_LIST:
            const copyBL = [...state.bookLists]
            //remove the booklist from action.payload from the list of booklists
            const filteredBookLists = copyBL.filter(bookList => bookList.id !== action.payload.id)
            return {
                ...state,
                bookLists: filteredBookLists
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