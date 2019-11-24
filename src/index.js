import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './contains/App';
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import bookReducer from './reducers/bookReducer'
import userReducer from './reducers/userReducer'
import bookClubReducer from './reducers/bookClubReducer'
import bookListReducer from './reducers/bookListReducer'
import thunk from 'redux-thunk'
import { ActionCableProvider } from 'react-actioncable-provider'

// combining all reducers using combineReducers
const rootReducer = combineReducers({
    bookReducer: bookReducer,
    userReducer: userReducer,
    bookClubReducer: bookClubReducer,
    bookListReducer: bookListReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(
    // web socket connection url
    <ActionCableProvider url="wss://booked-backend.herokuapp.com/cable">
        {/* passing redux store into Provider */}
        <Provider store={store}>
            <BrowserRouter>
                <Route path="/" component={App} />
            </BrowserRouter>
        </Provider>
    </ActionCableProvider>,
    document.getElementById('root')
);
