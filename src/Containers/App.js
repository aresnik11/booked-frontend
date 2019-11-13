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
import Login from '../components/Login'
import Signup from '../components/Signup'
import { connect } from 'react-redux'
import { autoLogin } from '../actions'

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
                    <Switch>
                        <Route exact path="/login" render={(routerProps) => <div className="home-login-container "><Login {...routerProps} /></div>}/>
                        <Route exact path="/signup" render={(routerProps) => <div className="home-login-container "><Signup {...routerProps} /></div>} />
                        <Route exact path="/profile" render={() => <div className="profile-container"><Profile /></div>} />
                        <Route exact path="/search" render={() => <div className="main-container"><SearchBooksContainer /></div>} />
                        <Route path="/booklists" render={() => <div className="main-container"><BookListContainer /></div>} />
                        <Route exact path="/books/:id" render={(routerProps) => <div className="main-container"><BookContainer {...routerProps} /></div>} />
                        <Route path="/bookclubs" render={() => <div className="main-container"><BookClubContainer /></div>} />
                        <Route exact path="/" render={() => <div className="home-login-container "><Homepage /></div>} />
                        <Route render={() => <div className="error-container"><Error /></div>} />
                    </Switch>
            </div>
        );
    }
}

export default connect(null, { autoLogin })(App);