import React from 'react'
import withAuth from '../components/withAuth'
import Search from '../components/Search'
import New from '../components/New'
import BookClubPreview from '../components/BookClubPreview'
import Loading from '../components/Loading'
import { connect } from 'react-redux'
import { fetchBookClubs, receiveMessage, receiveAddBookClub, receiveRemoveBookClub } from '../actions'
import { Grid } from 'semantic-ui-react'
import { ActionCableConsumer } from 'react-actioncable-provider'

class BookClubContainer extends React.Component {
    state = {
        searchTerm: ""
    }

    // controlled search form
    searchBookClub = (e) => {
        this.setState({
            searchTerm: e.target.value
        })
    }

    componentDidMount() {
        // fetches all of the book clubs
        this.props.fetchBookClubs()
    }

    // filters book clubs based on search term, creates a book club preview component for each book club in filtered book clubs
    makeBookClubs = () => {
        const filteredBookClubs = this.props.bookClubs.filter(bookClub => bookClub.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
        return filteredBookClubs.map(bookClub => <BookClubPreview key={bookClub.id} {...bookClub} />)
    }

    render() {
        return (
            <>
                {/* if we're still loading, show the loading component */}
                {this.props.loading
                ?
                <Loading />
                :
                <div>
                    <h1>Book Clubs</h1>
                    <br/>
                    {/* options grid including add new book club and search book clubs */}
                    <Grid columns="equal">
                        <Grid.Column>
                            <New type="Book Club" />
                        </Grid.Column>
                        {/* only render search component if there are book clubs */}
                        {this.props.bookClubs.length
                        ?
                        <Grid.Column>
                            <Search type="Book Clubs" searchTerm={this.state.searchTerm} searchHandler={this.searchBookClub} />
                        </Grid.Column>
                        :
                        null}
                    </Grid>
                    <br/><br/>

                    {/* book clubs */}
                    <Grid centered>
                        {this.makeBookClubs()}
                    </Grid>

                    {/* listening for updates to the book clubs channel from backend */}
                    <ActionCableConsumer
                        channel={{ channel: "BookClubsChannel" }}
                        onReceived={data => {
                            // if add book club, update redux store to add new book club
                            if (data.type === "ADD_BOOK_CLUB") {
                                this.props.receiveAddBookClub(data.payload)
                            }
                            // if remove book club, update redux store to remove book club
                            else if (data.type === "REMOVE_BOOK_CLUB") {
                                this.props.receiveRemoveBookClub(data.payload)
                            }
                        }}
                    />
                </div>}
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        bookClubs: state.bookClubReducer.bookClubs,
        loading: state.bookClubReducer.loading
    }
}

export default connect(mapStateToProps, { fetchBookClubs, receiveMessage, receiveAddBookClub, receiveRemoveBookClub })(withAuth(BookClubContainer))