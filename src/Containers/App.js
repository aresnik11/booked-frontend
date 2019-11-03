import React from 'react';
import '../App.css';
import Header from '../components/Header'
import SearchBooksContainer from './SearchBooksContainer';
import Profile from './Profile'
import Homepage from '../components/Homepage'
import Error from '../components/Error'
import { Route, Switch } from 'react-router-dom'
import BookListContainer from './BookListContainer';
import BookContainer from './BookContainer'
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
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/search" component={SearchBooksContainer} />
          <Route path="/profile" component={Profile} />
          <Route path="/booklists" component={BookListContainer} />
          <Route path="/books" component={BookContainer} />
          <Route exact path="/" component={Homepage} />
          <Route component={Error} />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps, { setCurrentUser, logOut })(App);
