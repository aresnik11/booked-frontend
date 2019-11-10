import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import bookReducer from './reducers/bookReducer'
import userReducer from './reducers/userReducer'
import bookClubReducer from './reducers/bookClubReducer'
import bookListReducer from './reducers/bookListReducer'
import thunk from 'redux-thunk'
import { ActionCableProvider } from 'react-actioncable-provider'

const rootReducer = combineReducers({
    bookReducer: bookReducer,
    userReducer: userReducer,
    bookClubReducer: bookClubReducer,
    bookListReducer: bookListReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(
    <ActionCableProvider url="ws://localhost:3001/cable">
        <Provider store={store}>
            <BrowserRouter>
                <Route path="/" component={App} />
            </BrowserRouter>
        </Provider>
    </ActionCableProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
