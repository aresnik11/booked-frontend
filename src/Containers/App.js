import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import '../css/App.css';
import '../css/Loading.scss'
import '../css/Book.css'
import '../css/BookShelf.css'
import Header from '../components/Header'
import SearchBooksContainer from './SearchBooksContainer'
import Profile from '../components/Profile'
import Homepage from '../components/Homepage'
import Error from '../components/Error'
import { Route, Switch } from 'react-router-dom'
import BookListContainer from './BookListContainer';
import BookContainer from './BookContainer'
import BookClubContainer from './BookClubContainer'
import MessageContainer from './MessageContainer'
import Login from '../components/Login'
import Signup from '../components/Signup'
import { connect } from 'react-redux'
import { autoLogin } from '../actions'
import ScrollToTop from '../ScrollToTop'

class App extends React.Component {
    componentDidMount() {
        const token = localStorage.getItem("token")
        if (token) {
            this.props.autoLogin()
        }
    }

    render() {
        return (
            <div className="App">
                <Route path="/" component={Header} />
                    {/* <ScrollToTop> */}
                        <Switch>
                            <Route exact path="/login" render={(routerProps) => {
                                return (
                                    <div className="home-login-container ">
                                        <Login {...routerProps} />
                                    </div>
                                )
                            }}/>
                            <Route exact path="/signup" render={(routerProps) => {
                                return (
                                    <div className="home-login-container ">
                                        <Signup {...routerProps} />
                                    </div>
                                )
                            }}/>
                            <Route exact path="/profile" render={() => {
                                return (
                                    <div className="profile-container">
                                        <Profile />
                                    </div>
                                )
                            }}/>
                            <Route exact path="/search" render={() => {
                                return (
                                    <ScrollToTop>
                                        <div className="main-container">
                                            <SearchBooksContainer />
                                        </div>
                                    </ScrollToTop>
                                )
                            }}/>
                            <Route path="/booklists" render={() => {
                                return (
                                    <ScrollToTop>
                                        <div className="main-container">
                                            <BookListContainer />
                                        </div>
                                    </ScrollToTop>
                                )
                            }}/>
                            <Route exact path="/books/:id" render={(routerProps) => {
                                return (
                                    <div className="main-container">
                                        <BookContainer {...routerProps} />
                                    </div>
                                )
                            }}/>
                            <Route exact path="/bookclubs/:id" render={(routerProps) => {
                                return (
                                    <div className="main-container">
                                        <MessageContainer {...routerProps} />
                                    </div>
                                )
                            }}/>
                            <Route exact path="/bookclubs" render={() => {
                                return (
                                    <ScrollToTop>
                                        <div className="main-container">
                                            <BookClubContainer />
                                        </div>
                                    </ScrollToTop>
                                )
                            }}/>
                            <Route exact path="/" render={() => {
                                return (
                                    <div className="home-login-container ">
                                        <Homepage />
                                    </div>
                                )
                            }}/>
                            <Route render={() => {
                                return (
                                    <div className="error-container">
                                        <Error />
                                    </div>
                                )
                            }}/>
                        </Switch>
                    {/* </ScrollToTop> */}
            </div>
        );
    }
}

export default connect(null, { autoLogin })(App);