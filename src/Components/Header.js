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
                        to="/"
                        name="home"
                        active={this.state.activeItem === "home"}
                        onClick={this.handleItemClick}
                    />
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
                        name="book lists"
                        active={this.state.activeItem === "book lists"}
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
                            name="log out"
                            active={this.state.activeItem === "log out"}
                            onClick={this.handleLogOut}
                        />
                        :
                        <>
                            <Menu.Item
                                as={ Link }
                                to="/login"
                                name="log in"
                                active={this.state.activeItem === "log in"}
                                onClick={this.handleItemClick}
                            />
                            <Menu.Item
                                as={ Link }
                                to="/signup"
                                name="sign up"
                                active={this.state.activeItem === "sign up"}
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