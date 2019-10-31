import React from 'react';
import '../App.css';
import SearchBooksContainer from './SearchBooksContainer';

const App = () => {
  return (
    <div className="App">
      <h1>Booked</h1>
      {/* <button onClick={() => getBooks()}>Get Books</button> */}
      <SearchBooksContainer />
    </div>
  );
}

export default App;
