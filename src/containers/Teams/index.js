import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import Header from 'Components/Header';
import Loader from 'Components/Loader';
import SeasonSelect from 'Components/SeasonSelect';
// import { Form, Button } from 'react-bootstrap';
import { fetchTeams } from 'Containers/Teams/calls';

import PropTypes from 'prop-types';

import './style.scss';
import ErrorContainer from '../../components/ErrorContainer';

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
        const {teams:{isFetching, error, data}, match} = this.props;
        return (
            <div id="teams">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Teams</title>
                </Helmet>
                <Header match={match}/>
                <div className="teams-wrapper">
                    <div className="season-dropdown">
                        <SeasonSelect />
                    </div>
                    <div className="team-list-wrapper">
                        {isFetching && <Loader />}
                        {!isFetching &&  error && <ErrorContainer errorMessage={error} />}
                        {!isFetching &&  data && Array.isArray(data) && 
                            data.map((team) => (<div className="team" id={`team#${team.id}`}>{team.name}</div>))
                        }
                    </div>
                </div>
            </div>
        );
    }
}
Home.propTypes = {
    // children: PropTypes.element
    // resetLogin: PropTypes.func.isRequired,
    fetchteams: PropTypes.func.isRequired,
    teams: PropTypes.instanceOf(Object).isRequired,
    match: PropTypes.instanceOf(Object).isRequired
};
const mapStateToProps = state => ({ teams: state.teams });
const mapDispatchToProps = {
    fetchteams: fetchTeams
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
