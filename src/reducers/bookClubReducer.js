import {
    FETCH_BOOK_CLUBS,
    ADD_BOOK_CLUB,
    REMOVE_BOOK_CLUB,
    ADD_MESSAGE
} from '../types'

const defaultState = {
    bookClubs: []
}

function bookClubReducer(state = defaultState, action) {
    switch(action.type) {
        case FETCH_BOOK_CLUBS:
            return {
                ...state,
                bookClubs: action.payload
            }
        case ADD_BOOK_CLUB:
            return {
                ...state,
                bookClubs: [...state.bookClubs, action.payload]
            }
        case REMOVE_BOOK_CLUB:
            const bookClubsCopy = [...state.bookClubs]
            //remove the bookclub from action.payload from the list of bookClubs
            const filteredBookClubs = bookClubsCopy.filter(bookClub => bookClub.id !== action.payload.id)
            return {
                ...state,
                bookClubs: filteredBookClubs
            }
        case ADD_MESSAGE:
            const copyBookClubs = [...state.bookClubs]
            //finding the bookclub from action.payload
            const foundBookClub = copyBookClubs.find(bookClub => bookClub.id === action.payload.book_club_id)
            //add a message to that bookClub, from action.payload
            foundBookClub.messages = [...foundBookClub.messages, action.payload]
            return {
                ...state,
                bookClubs: copyBookClubs
            }
        default:
            return state
    }
}

export default bookClubReducer