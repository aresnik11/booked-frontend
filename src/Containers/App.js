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

class App extends React.Component {
  state = {
    currentUser: null,
    bookLists: [],
    authors: []
  }

  componentDidMount() {
    const token = localStorage.token
    if (token) {
      fetch("http://localhost:3001/api/v1/auto_login", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then(resp => resp.json())
      .then(response => {
        console.log(response)
        if (response.errors) {
          console.log(response.errors)
          this.logout()
        }
        else {
          this.setState({
            currentUser: {
              id: response.user.id,
              username: response.user.username
            },
            bookLists: response.user.book_lists,
            authors: response.user.authors
          })
        }
      })
    }
  }

  setUser = (response) => {
    console.log(response)
    if (response.errors) {
      alert(response.errors)
    }
    else {
      this.setState({
        currentUser: {
          id: response.user.id,
          username: response.user.username
        },
        bookLists: response.user.book_lists,
        authors: response.user.authors
      }, () => {
        localStorage.token = response.token
        this.props.history.push("/profile")
      })
    }
  }

  logout = () => {
    this.setState({
      currentUser: null
    }, () => {
      localStorage.removeItem("token")
      this.props.history.push("/login")
    })
  }

  render() {
    return (
      <div className="App">
        <Header logout={this.logout} />
        <Switch>
          <Route path="/login" render={() => <Login setUser={this.setUser} />} />
          <Route path="/signup" render={() => <Signup setUser={this.setUser} />} />
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

export default App;
