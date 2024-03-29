import React from "react";
import { withRouter } from "react-router-dom";

class ScrollToTop extends React.Component {
    // if we're on a new page, scroll to top of screen
    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            window.scrollTo(0, 0);
        }
  }

    render() {
        return this.props.children;
    }
}

export default withRouter(ScrollToTop);