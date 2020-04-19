import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { Table, Tabs, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { fetchTeamDetails } from 'Containers/Team/calls';
import Header from 'Components/Header';
import Loader from 'Components/Loader';
import ErrorContainer from '../../components/ErrorContainer';
import './style.scss';

class Team extends Component {

    constructor(props) {
        super(props);
        this.chartReference = React.createRef();
    }
    componentDidMount() {
        const { fetchteamdetails, match } = this.props;
        fetchteamdetails(match.params.teamid);
    }
    render() {
        const {
            teamdetails: { isFetching, error, data },
            match
        } = this.props;

        let teams = [];
        if (!isFetching && data) {
            teams = data.teamdetails;
        }

        let seasonList = [];
        let winsList = [];
        let lossesList = [];
        let pointsList = [];

        data &&
            teams &&
            teams.standings &&
            Object.keys(teams.standings).map(season => (
                seasonList.push("Season" + season),
                teams.standings[season].map(stan =>
                    winsList.push(stan.WINS) &&
                    pointsList.push(stan.POINTS) &&
                    lossesList.push(stan.LOSSES)


                )
            ))
        const chartData = {
            labels: seasonList,
            datasets: [
                {
                    label: 'wins',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: '#4a148c',
                    borderColor: '#4a148c',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: '#4a148c',
                    pointBackgroundColor: '#4a148c',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: '#4a148c',
                    pointHoverBorderColor: '#4a148c',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: winsList
                },
                {
                    label: 'points',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: '#d50000',
                    borderColor: '#d50000',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: '#d50000',
                    pointBackgroundColor: '#d50000',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: '#d50000',
                    pointHoverBorderColor: '#d50000',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: pointsList
                }
            ]
        };

        return (
            <div id="team">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Squad</title>
                </Helmet>
                <Header match={match} />
                <div>
                    <div className="score">
                        <span>ROSTER</span>{' '}
                    </div>
                    <div className="">
                        {(isFetching) && <Loader />}
                        {error && <ErrorContainer errorMessage={error} />}
                        {data &&
                            teams &&
                            <div
                                key={`1`}
                                id={`1`}
                            >
                                <div className="team-list-wrapper">

                                    {data &&
                                        teams &&
                                        teams.squad.map(team => (
                                            <div
                                                className="team"
                                                key={`team#${team.PLAYER_NAME}`}
                                                id={`team#${team.PLAYER_NAME}`}
                                            >

                                                {team.PLAYER_NAME}

                                            </div>
                                        ))}
                                </div>

                                <div className="score">
                                    <span>Top performers</span>{' '}
                                </div>

                                <Table striped bordered size="sm">
                                    <thead>
                                        <tr>
                                            <th>Player</th>
                                            <th>Runs Scored</th>


                                        </tr>
                                    </thead>

                                    <tbody>
                                        {(isFetching) && <Loader />}
                                        {error && <ErrorContainer errorMessage={error} />}
                                        {data &&
                                            teams &&
                                            teams.best &&
                                            teams.best.map(team => (


                                                <tr key={`#id-player-${team.PLAYER_NAME}`}>
                                                    <td>
                                                        {team.PLAYER_NAME}
                                                    </td>
                                                    <td>
                                                        {team.RUNS}
                                                    </td>


                                                </tr>
                                            )
                                            )}
                                    </tbody>
                                </Table>


                                <div className="score">
                                    <span>Performance over seasons</span>{' '}
                                </div>


                                <Table striped bordered size="sm">
                                    <thead>
                                        <tr>
                                            <th>Season</th>
                                            <th>WINS</th>
                                            <th>LOSSES</th>
                                            <th>POINTS</th>

                                        </tr>
                                    </thead>

                                    <tbody>
                                        {(isFetching) && <Loader />}
                                        {error && <ErrorContainer errorMessage={error} />}
                                        {data &&
                                            teams &&
                                            teams.standings &&
                                            Object.keys(teams.standings).map(season => (

                                                teams.standings[season].map(stand =>
                                                    <tr key={`#id-player-${season}`}>
                                                        <td>
                                                            {season}
                                                        </td>
                                                        <td>
                                                            {stand.WINS}
                                                        </td>
                                                        <td>
                                                            {stand.LOSSES}
                                                        </td>
                                                        <td>
                                                            {stand.POINTS}
                                                        </td>

                                                    </tr>
                                                )
                                            ))}
                                    </tbody>
                                </Table>
                                <div>
                                    <div className="score">
                                        <span>Seasons performance chart</span>{' '}
                                    </div>
                                    <Line data={chartData} /><br /><br /><br />
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div >
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
