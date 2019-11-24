import {
    FETCH_BOOK_CLUBS,
    ADD_BOOK_CLUB,
    REMOVE_BOOK_CLUB,
    RECEIVE_MESSAGE,
    ADD_BOOK_CLUB_ERROR,
    MESSAGE_ERROR
} from '../actions/types'

const defaultState = {
    bookClubs: [],
    bookClubError: false,
    loading: true,
    messageError: false
}

function bookClubReducer(state = defaultState, action) {
    switch(action.type) {
        case FETCH_BOOK_CLUBS:
            // updates book clubs to action.payload, resets loading and all errors to false
            return {
                ...state,
                bookClubs: action.payload,
                loading: false,
                bookClubError: false,
                messageError: false
            }
        case ADD_BOOK_CLUB:
            return {
                ...state,
                // adds new book club from action.payload to array of book clubs
                bookClubs: [...state.bookClubs, action.payload],
                bookClubError: false
            }
        case ADD_BOOK_CLUB_ERROR:
            return {
                ...state,
                bookClubError: action.payload
            }
        case REMOVE_BOOK_CLUB:
            const bookClubsCopy = [...state.bookClubs]
            // remove the bookclub from action.payload from the list of bookClubs
            const filteredBookClubs = bookClubsCopy.filter(bookClub => bookClub.id !== action.payload.id)
            return {
                ...state,
                bookClubs: filteredBookClubs
            }
        case RECEIVE_MESSAGE:
            const copyBookClubs = [...state.bookClubs]
            // finding the bookclub from action.payload
            const foundBookClub = copyBookClubs.find(bookClub => bookClub.id === action.payload.book_club_id)
            // add a message to that bookClub, from action.payload
            foundBookClub.messages = [...foundBookClub.messages, action.payload]
            return {
                ...state,
                bookClubs: copyBookClubs,
                messageError: false
            }
        case MESSAGE_ERROR:
            return {
                ...state,
                messageError: action.payload
            }
        default:
            return state
    }
}

export default bookClubReducer