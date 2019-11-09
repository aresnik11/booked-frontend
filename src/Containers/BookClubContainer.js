import React from 'react'
import withAuth from '../withAuth'
import Search from '../components/Search'
import New from '../components/New'
import BookClubPreview from '../components/BookClubPreview'
import BookListClubShow from '../components/BookListClubShow'
import Message from '../components/Message'
import Error from '../components/Error'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchBookClubs, receiveMessage } from '../actions'
import { Comment, Header } from 'semantic-ui-react'
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
            <Switch>
                <Route path="/bookclubs/:id" render={(routerProps) => {
                    //find the bookclub that matches this id from all bookclubs
                    const bookClubId = parseInt(routerProps.match.params.id)
                    const bookClubObj = this.props.bookClubs.find(bookClub => bookClub.id === bookClubId)
                    // only render BookClubShow component if we found the book club object
                    if (bookClubObj) {
                        return (
                            <div>
                                <BookListClubShow type="Book Club" {...bookClubObj} />
                                <br/><br/>
                                <New type="Message" bookClub={bookClubObj} />
                                <br/><br/>
                                <Comment.Group className="message-container">
                                    <Header as='h3' dividing content="Messages" />
                                    {bookClubObj.messages.map(message => <Message key={message.id} {...message} />)}
                                </Comment.Group>
                                <ActionCableConsumer
                                    channel={{ channel: "BookClubChannel", book_club_id: bookClubObj.id }}
                                    onReceived={data => this.props.receiveMessage(data)}
                                />
                            </div>
                        )
                    }
                    // if we couldn't find the book club object, render Error component
                    else {
                        return <Error />
                    }
                }}/>
                <Route path="/bookclubs" render={() => {
                    return (
                        <div>
                            <h1>Book Clubs</h1>
                            <br/>
                            <New type="Book Club" />
                            <br/><br/>
                            <Search type="Book Clubs" searchTerm={this.state.searchTerm} searchHandler={this.searchBookClub} />
                            <br/><br/>
                            <div>
                                {filteredBookClubs.map(bookClub => <BookClubPreview key={bookClub.id} {...bookClub} />)}
                            </div>
                        </div>
                    )
                }}/>
            </Switch>
            
        )
    }
}

function mapStateToProps(state) {
    console.log(state)
    return {
        bookClubs: state.bookClubReducer.bookClubs,
    }
}

export default connect(mapStateToProps, { fetchBookClubs, receiveMessage })(withAuth(BookClubContainer))