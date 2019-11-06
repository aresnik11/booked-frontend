import React from 'react'
import Loading from '../components/Loading'
import BookPreview from '../components/BookPreview'
import { connect } from 'react-redux'
import { fetchSearchedBooks } from '../actions'

class SearchBooksContainer extends React.Component {
    renderMoreResults = () => {
        //chrome, firefox, IE, opera place overflow at html level, which is targeted via body
        //safari still uses body
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
    }

    componentDidMount(){
        document.addEventListener("scroll", this.renderMoreResults)
    }

    componentWillUnmount(){
        document.removeEventListener("scroll", this.renderMoreResults)
    }

    render() {
        return (
            <>
                {this.props.loading
                ?
                <Loading />
                :
                <div>
                    {/* only show number of search results if totalItems isn't null (initial value before search) */}
                    {this.props.totalItems !== null ? <h3>{this.props.totalItems} search results</h3> : null}
                    <div>
                        {this.props.searchedBooks.map((book, index) => <BookPreview key={index} {...book} />)}
                    </div>
                </div>}
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        searchedBooks: state.searchBooksReducer.searchedBooks,
        totalItems: state.searchBooksReducer.totalItems,
        searchTerm: state.searchBooksReducer.searchTerm,
        searchType: state.searchBooksReducer.searchType,
        startIndex: state.searchBooksReducer.startIndex,
        loading: state.searchBooksReducer.loading
    }
}

export default connect(mapStateToProps, { fetchSearchedBooks })(SearchBooksContainer)