import React, { Component } from "react";

class InfiniteScroll extends Component {
    state = {
        numDisplayed: 50,
    }

    renderMoreResults = () => {
        //chrome, firefox, IE, opera place overflow at html level, which is targeted via body
        //safari still uses body
        if ((document.documentElement.scrollHeight === document.documentElement.scrollTop + window.innerHeight) || (document.body.scrollHeight === document.body.scrollTop + window.innerHeight)) {
            this.setState({
                numDisplayed: this.state.numDisplayed + 36
            });
        }
    }

    componentDidMount() {
        document.addEventListener("scroll", this.renderMoreResults)
    }

    componentWillUnmount() {
        document.removeEventListener("scroll", this.renderMoreResults)
    }

    showItems() {
        var items = []
        for (var i = 0; i < this.state.numDisplayed; i++) {
            items.push(<li key={i}> Item {i} </li>);
        }
        return items
    }

    render() {
        return (
            <div>
                {this.showItems()}
            </div>
        );
    }
}


export default InfiniteScroll