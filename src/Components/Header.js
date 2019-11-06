import React from 'react'
import { connect } from 'react-redux'
import { logOut } from '../actions'
import { Menu, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Header extends React.Component {
    state = {
        activeItem: ""
    }

    handleItemClick = (e, { name }) => {
        this.setState({
            activeItem: name
        })
    }

    handleLogOut = () => {
        // this.handleItemClick()
        this.props.logOut()
        localStorage.removeItem("token")
        this.props.history.push("/login")
    }

    render() {
        return (
            <Segment className="fixed">
                {/* may want to add stackable, makes menu stack in mobile views */}
                <Menu secondary size="large">
                    {/* <Menu.Item>
                        <img src='/logo.png' alt=""/>
                    </Menu.Item> */}
                    <Menu.Item
                        as={ Link }
                        to="/profile"
                        name="profile"
                        active={this.state.activeItem === "profile"}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        as={ Link }
                        to="/booklists"
                        name="booklists"
                        active={this.state.activeItem === "booklists"}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        as={ Link }
                        to="/search"
                        name="search"
                        active={this.state.activeItem === "search"}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Menu position="right">
                        {localStorage.token
                        ?
                        <Menu.Item
                            name="logout"
                            active={this.state.activeItem === "logout"}
                            onClick={this.handleLogOut}
                        />
                        :
                        <>
                            <Menu.Item
                                as={ Link }
                                to="/login"
                                name="login"
                                active={this.state.activeItem === "login"}
                                onClick={this.handleItemClick}
                            />
                            <Menu.Item
                                as={ Link }
                                to="/signup"
                                name="signup"
                                active={this.state.activeItem === "signup"}
                                onClick={this.handleItemClick}
                            />
                        </>
                        }

                    </Menu.Menu>
                </Menu>
            </Segment>
        )
    }
}

export default connect(null, { logOut })(Header)