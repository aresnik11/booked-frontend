import React from 'react'
import withAuth from '../withAuth'
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

    searchBookClub = (e) => {
        this.setState({
            searchTerm: e.target.value
        })
    }

    componentDidMount() {
        this.props.fetchBookClubs()
    }

    render() {
        const filteredBookClubs = this.props.bookClubs.filter(bookClub => bookClub.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
        return (
            <>
                {this.props.loading
                ?
                <Loading />
                :
                <div>
                    <h1>Book Clubs</h1>
                    <br/>
                    <Grid columns="equal">
                        <Grid.Column>
                            <New type="Book Club" />
                        </Grid.Column>
                        {this.props.bookClubs.length
                        ?
                        <Grid.Column>
                            <Search type="Book Clubs" searchTerm={this.state.searchTerm} searchHandler={this.searchBookClub} />
                        </Grid.Column>
                        :
                        null}
                    </Grid>
                    <br/><br/>
                    <Grid centered>
                        {filteredBookClubs.map(bookClub => <BookClubPreview key={bookClub.id} {...bookClub} />)}
                    </Grid>
                    <ActionCableConsumer
                        channel={{ channel: "BookClubsChannel" }}
                        onReceived={data => {
                            if (data.type === "ADD_BOOK_CLUB") {
                                this.props.receiveAddBookClub(data.payload)
                            }
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