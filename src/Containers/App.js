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

const App = () => {
  return (
    <div className="App">
      <Header />
      <Switch>
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

export default App;
