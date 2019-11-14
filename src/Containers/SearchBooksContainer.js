import React from 'react'
import Loading from '../components/Loading'
import BookPreview from '../components/BookPreview'
import SearchBooks from '../components/SearchBooks'
import { connect } from 'react-redux'
import { fetchSearchedBooks } from '../actions'
import withAuth from '../withAuth'
import { Grid, Button } from 'semantic-ui-react'

class SearchBooksContainer extends React.Component {
    state = {
        backToTopVisible: false
    }

    renderMoreResults = () => {
        //accounting for browser differences by targeting document.body and document.documentElement
        //if the amount we scrolled down plus the window size is equal to the entire scroll height, we are at the bottom
        if ((document.documentElement.scrollHeight === document.documentElement.scrollTop + window.innerHeight) || (document.body.scrollHeight === document.body.scrollTop + window.innerHeight)) {
            //if the length of our searchedBooks is less than the totalItems for the search, we can refetch
            if (this.props.totalItems !== null && this.props.searchedBooks.length < this.props.totalItems) {
                //refetching with the same search term and type from original search
                //increasing index by 40 to get next 40 books
                this.props.fetchSearchedBooks({
                    search: this.props.searchTerm,
                    type: this.props.searchType,
                    index: this.props.startIndex + 40
                })
            }
        }
        //if we scrolled one screens worth down the page, show the back to top button
        if ((document.documentElement.scrollTop > window.innerHeight) || (document.body.scrollTo > window.innerHeight)) {
            this.setState({
                backToTopVisible: true
            })
        }
        //otherwise reset back to false
        else {
            this.setState({
                backToTopVisible: false
            })
        }
    }

    scrollToTop = () => {
        window.scrollTo({
            behavior: "smooth",
            top: 0,
            left: 0
        })
        this.setState({
            backToTopVisible: false
        })
    }

    componentDidMount() {
        document.addEventListener("scroll", this.renderMoreResults)
    }

    componentWillUnmount() {
        document.removeEventListener("scroll", this.renderMoreResults)
    }

    render() {
        return (
            <div>
                <SearchBooks />
                <br/><br/>
                {this.props.loading
                ?
                <Loading />
                :
                <div>
                    {/* only show number of search results if totalItems isn't null (initial value before search) */}
                    {this.props.totalItems !== null ? <h3>{this.props.totalItems} search results</h3> : null}
                    <Grid centered>
                        {this.props.searchedBooks.map((book, index) => <BookPreview key={index} {...book} />)}
                    </Grid>
                    {this.state.backToTopVisible
                    ?
                    <Button
                        circular
                        size="massive"
                        icon='arrow up'
                        className="btn"
                        id="back-to-top"
                        onClick={this.scrollToTop}
                    />
                    :
                    null}
                </div>}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        searchedBooks: state.bookReducer.searchedBooks,
        totalItems: state.bookReducer.totalItems,
        searchTerm: state.bookReducer.searchTerm,
        searchType: state.bookReducer.searchType,
        startIndex: state.bookReducer.startIndex,
        loading: state.bookReducer.loading
    }
}

export default connect(mapStateToProps, { fetchSearchedBooks })(withAuth(SearchBooksContainer))