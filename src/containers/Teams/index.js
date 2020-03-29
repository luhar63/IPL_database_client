import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import Header from 'Components/Header';
import SeasonSelect from 'Components/SeasonSelect';
// import { Form, Button } from 'react-bootstrap';
import { fetchTeams } from 'Containers/Teams/calls';

import PropTypes from 'prop-types';

import './style.scss';

class Home extends Component {
    //   state = {
    //       email: '',
    //       password: ''
    //   };

    componentDidMount() {
        const { fetchteams } = this.props;
        fetchteams();
    }

    render() {
        return (
            <div id="teams">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Teams</title>
                </Helmet>
                <Header />
                <div className="teams-wrapper">
                    <div className="text-center season-dropdown">
                        <SeasonSelect />
                    </div>
                </div>
            </div>
        );
    }
}
Home.propTypes = {
    // children: PropTypes.element
    // resetLogin: PropTypes.func.isRequired,
    fetchteams: PropTypes.func.isRequired
};
const mapStateToProps = state => ({ user: state.user });
const mapDispatchToProps = {
    fetchteams: fetchTeams
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
