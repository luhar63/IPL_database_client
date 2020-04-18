import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { Table, Tabs, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { fetchTeamDetails } from 'Containers/Team/calls';
import Header from 'Components/Header';
import Loader from 'Components/Loader';
import ErrorContainer from '../../components/ErrorContainer';
import './style.scss';

class Team extends Component {
    componentDidMount() {
        const { fetchteamdetails, match } = this.props;
        fetchteamdetails(match.params.teamid);
    }
    render() {
      const {
          teamdetails: { isFetching, error, data },
          match
      } = this.props;
      console.log(data);
      
      let teams = [];
      if (!isFetching && data) {
          teams = data.teamdetails;
      }

      return (
          <div id="squad">
              <Helmet>
                  <meta charSet="utf-8" />
                  <title>Squad</title>
              </Helmet>
              <Header match={match} />
              <div className="team-wrapper">
                  <div className="team-list-wrapper">
                      {(isFetching) && <Loader />}
                      {error && <ErrorContainer errorMessage={error} />}
                      {data &&
              teams &&
              teams.map(team => (
                          <div
                      className="team"
                      key={`team#${team.PLAYER_NAME}`}
                      id={`team#${team.PLAYER_NAME}`}
                  >
                      
                      {team.PLAYER_NAME}
                      {team.RUNS}
                  </div>
              ))}
                  </div>

              </div>
          </div>
      );
  }
}

Team.propTypes = {
    teamdetails: PropTypes.instanceOf(Object).isRequired,

    fetchteamdetails: PropTypes.func.isRequired,
    match: PropTypes.instanceOf(Object).isRequired
};

const mapStateToProps = state => ({ teamdetails: state.teamdetails });
const mapDispatchToProps = {
    fetchteamdetails: teamid => fetchTeamDetails(teamid)
};

export default connect(mapStateToProps, mapDispatchToProps)(Team);
