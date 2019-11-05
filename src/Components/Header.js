import React from 'react'
import { connect } from 'react-redux'
import { logOut } from '../actions'
import { Menu, Segment } from 'semantic-ui-react'

class Header extends React.Component {
    state = { activeItem: 'profile' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    handleLogOut = () => {
        this.handleItemClick()
        this.props.logOut()
        localStorage.removeItem("token")
        this.props.history.push("/login")
    }

    render() {
        const { activeItem } = this.state

        return (
            // <Segment inverted color="blue">
                <Menu inverted color="blue" stackable size="large">
                    <Menu.Item>
                        <img src='/logo.png' alt=""/>
                    </Menu.Item>
                    <Menu.Item
                        name='Profile'
                        active={activeItem === 'profile'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='Booklists'
                        active={activeItem === 'booklists'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='Search'
                        active={activeItem === 'search'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='Logout'
                        active={activeItem === 'logout'}
                        onClick={this.handleLogOut}
                    />
                </Menu>
            // </Segment>
            // <div>
            //     <h1>Booked</h1>
            //     <h3 onClick={this.handleLogOut}>Logout</h3>
            // </div>
        )
    }

}

export default connect(null, { logOut })(Header)