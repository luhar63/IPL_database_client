import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import Header from 'Components/Header';
import PropTypes from 'prop-types';

import './style.scss';

class Page404 extends Component {
    state = {};

    render() {
        const {match} = this.props;
        return (
            <div>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>404 PAGE NOT FOUND</title>
                </Helmet>
                <Header match={match}/>
                <div className="wrapper-404 text-center">
                    404 Page Not Found
                </div>
            </div>
        );
    }
}
Page404.propTypes = {
    // children: PropTypes.element
    match: PropTypes.instanceOf(Object).isRequired
};
const mapStateToProps = (state) => state;
const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Page404);
