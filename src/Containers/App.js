import React from 'react';
import '../css/App.css';
import '../css/Loading.scss'
import 'semantic-ui-css/semantic.min.css';
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
import { setCurrentUser, logOut } from '../actions'

class App extends React.Component {
  componentDidMount() {
    const token = localStorage.getItem("token")
    if (token) {
      fetch("http://localhost:3001/api/v1/auto_login", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then(resp => resp.json())
      .then(response => {
        if (response.errors) {
          console.log(response.errors)
          this.props.logOut()
        }
        else {
          this.props.setCurrentUser(response.user)
        }
      })
    }
  }

  render() {
    return (
      <div className="App">
        <Route path="/" component={Header} />
        <div className="main-container">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/profile" component={Profile} />
            <Route path="/search" component={SearchBooksContainer} />
            <Route path="/booklists" component={BookListContainer} />
            <Route path="/books" component={BookContainer} />
            <Route path="/bookclubs" component={BookClubContainer} />
            <Route exact path="/" component={Homepage} />
            <Route component={Error} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default connect(null, { setCurrentUser, logOut })(App);
