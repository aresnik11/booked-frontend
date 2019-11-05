import React from 'react'
import BookPreview from '../components/BookPreview'
import BookShow from '../components/BookShow'
import AddToBookList from '../components/AddToBookList'
import Error from '../components/Error'
import Search from '../components/Search'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import BookListContainer from './BookListContainer'
import withAuth from '../withAuth'
import Loading from '../components/Loading'
import { fetchSearchedBooks } from '../actions'

class BookContainer extends React.Component {
    state = {
        searchTerm: "",
        numDisplayed: 40
    }

    renderMoreResults = () => {
        //chrome, firefox, IE, opera place overflow at html level, which is targeted via body
        //safari still uses body
        if ((document.documentElement.scrollHeight === document.documentElement.scrollTop + window.innerHeight) || (document.body.scrollHeight === document.body.scrollTop + window.innerHeight)) {
            //check if numDisplayed is less than totalItems
            //if it is, refetch. otherwise do nothing
            this.setState({
                numDisplayed: this.state.numDisplayed + 40
            });
        }
    }

    componentDidMount(){
        document.addEventListener("scroll", this.renderMoreResults)
    }

    componentWillUnmount(){
        document.removeEventListener("scroll", this.renderMoreResults)
    }

    searchBook = (e) => {
        this.setState({
            searchTerm: e.target.value
        })
    }

    render() {
        console.log("numDisplayed:", this.state.numDisplayed)
        return (
            <Switch>
                <Route path="/books/:id" render={routerProps => {
                    // if we came from a booklist show page, bookListObj will be in state of routerProps
                    const bookListObj = routerProps.location.state.bookListObj
                    if (bookListObj) {
                        const bookId = parseInt(routerProps.match.params.id)
                        const bookObj = bookListObj.books.find(book => book.id === bookId)
                        // only render BookShow component if we found the book object
                        if (bookObj) {
                            return (
                                <div>
                                    <BookShow key={bookObj.id} {...bookObj} />
                                    <AddToBookList book={bookObj} />
                                    <BookListContainer book={bookObj} />
                                </div>
                            )
                        }
                        // if we couldn't find the book object, render Error component
                        else {
                            return <Error />
                        }
                    }
                    // if we came from the search page, book id will be string of letters that becomes NaN when parseInt-ed
                    else {
                        const bookVolumeId = routerProps.match.params.id
                        const searchBookObj = this.props.searchedBooks.find(book => book.volume_id === bookVolumeId)
                        // only render BookShow component if we found the book object
                        if (searchBookObj) {
                            return (
                                <div>
                                    <BookShow key={searchBookObj.volume_id} {...searchBookObj} />
                                    <AddToBookList book={searchBookObj} />
                                    <BookListContainer book={searchBookObj} />
                                </div>
                            )
                        }
                        // if we couldn't find the book object, render Error component
                        else {
                            return <Error />
                        }
                    }
    
                }}/>
                <Route path="/booklists/:id" render={() => {
                    const filteredBooks = this.props.bookListObj.books.filter(book => book.title.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
                    return (
                        <div>
                            <Search searchTerm={this.state.searchTerm} searchHandler={this.searchBook} />
                            <div>
                                {/* passing books for this booklist in props from BookListContainer component */}
                                {filteredBooks.map(book => <BookPreview key={book.id} {...book} bookListObj={this.props.bookListObj} />)}
                            </div>
                        </div>
                    )
                }} />
                <Route path="/search" render={() => {
                    return (
                        <>
                            {this.props.loading
                            ?
                            <Loading />
                            :
                            <div>
                                {this.props.searchedBooks.slice(0, this.state.numDisplayed).map(book => <BookPreview key={book.volume_id} {...book} />)}
                                {/* {this.props.searchedBooks.map(book => <BookPreview key={book.volume_id} {...book} />)} */}
                            </div>
                            }
                        </>
                    )
                }} />
            </Switch>
        )
    }
}

function mapStateToProps(state) {
    console.log(state)
    return {
        bookLists: state.userReducer.bookLists,
        searchedBooks: state.booksReducer.searchedBooks,
        loading: state.booksReducer.loading,
        loadedItems: state.booksReducer.loadedItems,
        hasMoreItems: state.booksReducer.hasMoreItems,
        totalItems: state.booksReducer.totalItems
    }
}

export default connect(mapStateToProps, { fetchSearchedBooks })(withAuth(BookContainer))