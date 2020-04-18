import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { fetchPlayerDetails } from 'Containers/Player/calls';
import Header from 'Components/Header';
import Loader from 'Components/Loader';
import ErrorContainer from '../../components/ErrorContainer';
import './style.scss';

class Player extends Component {

    constructor(props) {
        super(props);
        this.chartReference = React.createRef();
    }

    componentDidMount() {
        const { fetchplayerdetails, match } = this.props;
        fetchplayerdetails(match.params.playerid);
    }

    render() {
        const {
            playerdetails: { isFetching, error, data },
            match
        } = this.props;
        let playerdetails = [];

        if (!isFetching && data) {
            // eslint-disable-next-line prefer-destructuring
            playerdetails = data.playerdetails;
        }

        const seasonList = [];
        const runsList = [];
        const wicketsList = [];
        const ballsFacedList = [];
        const foursList = [];
        const sixesList = [];
        const ballsBowledList = [];

        if (data &&
            playerdetails &&
            playerdetails.seasonStats) {
            Object.keys(playerdetails.seasonStats).map(season => {
                seasonList.push(`Season ${season}`);
                playerdetails.seasonStats[season].map(sstats =>
                    runsList.push(sstats.total_runs) &&
                    wicketsList.push(sstats.total_wickets) &&
                    foursList.push(sstats.fours) &&
                    sixesList.push(sstats.sixes) &&
                    ballsFacedList.push(sstats.balls_faced) &&
                    ballsBowledList.push(sstats.balls_bowled)
                )
                return null;
            }
            )
        }


        const runsData = {
            labels: seasonList,
            datasets: [
                {
                    label: 'total runs',
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
                    data: runsList
                },
                {
                    label: 'balls faced',
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
                    data: ballsFacedList
                }
            ]
        };

        const boundariesData = {
            labels: seasonList,
            datasets: [
                {
                    label: 'fours',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: '#64dd17',
                    borderColor: '#64dd17',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: '#64dd17',
                    pointBackgroundColor: '#64dd17',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: '#64dd17',
                    pointHoverBorderColor: '#64dd17',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: foursList
                },
                {
                    label: 'sixes',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: '#000000',
                    borderColor: '#000000',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: '#000000',
                    pointBackgroundColor: '#000000',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: '#000000',
                    pointHoverBorderColor: '#000000',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: sixesList
                }
            ]
        };

        const ballsData = {
            labels: seasonList,
            datasets: [
                {
                    label: 'total wickets',
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
                    data: wicketsList
                },
                {
                    label: 'balls bowled',
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
                    data: ballsBowledList
                }
            ]
        };

        return (
            <div id="player" >
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Player</title>
                </Helmet>
                <Header match={match} />

                {data &&
                    playerdetails &&
                    <div className="player-header">
                        <div className={`team-sprite small team-${playerdetails.team_id}`}></div>
                        <h1 id="player-name">{`${playerdetails.player_name}`}</h1>
                    </div>
                }

                <div>

                    <div className="playerdetails-wrapper">
                        {(isFetching) && <Loader />}
                        {error && <ErrorContainer errorMessage={error} />}
                        {data &&
                            playerdetails &&
                            playerdetails.stats.map(stats => (
                                <div
                                    key={`player#${playerdetails.player_id}`}
                                    id={`player#${playerdetails.player_id}`}
                                >
                                    <div className="score">
                                        <span>Player Details</span>{' '}
                                    </div>

                                    <Table striped bordered size="sm">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Date of Birth</th>
                                                <th>Batting Style</th>
                                                <th>Bowling Style</th>
                                                <th>Country</th>
                                                <th>Team</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr key={`#id-player-${playerdetails.player_id}`}>
                                                <td>
                                                    {playerdetails.player_name}
                                                </td>
                                                <td>
                                                    {playerdetails.dob}
                                                </td>
                                                <td>
                                                    {playerdetails.batting_hand}
                                                </td>
                                                <td>
                                                    {playerdetails.bowling_skill}
                                                </td>
                                                <td>
                                                    {playerdetails.country}
                                                </td>
                                                <td>
                                                    {playerdetails.team_name}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>

                                    <div className="score">
                                        <span>Player Stats</span>{' '}
                                    </div>

                                    <Table striped bordered size="sm">
                                        <thead>
                                            <tr>
                                                <th>Matches Played</th>
                                                <th>Balls Faced</th>
                                                <th>Runs Scored</th>
                                                <th>4s</th>
                                                <th>6s</th>
                                                <th>Balls Bowled</th>
                                                <th>Wickets Taken</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr key={`#id-player-${playerdetails.player_id}`}>
                                                <td>
                                                    {stats.matches_played}
                                                </td>
                                                <td>
                                                    {stats.balls_faced}
                                                </td>
                                                <td>
                                                    {stats.total_runs}
                                                </td>
                                                <td>
                                                    {stats.fours}
                                                </td>
                                                <td>
                                                    {stats.sixes}
                                                </td>
                                                <td>
                                                    {stats.balls_bowled}
                                                </td>
                                                <td>
                                                    {stats.total_wickets}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    <div
                                        key={`player#${playerdetails.player_id}`}
                                        id={`player#${playerdetails.player_id}`}
                                    >
                                        <div className="score">
                                            <span>Seasonwise Stats</span>{' '}
                                        </div>


                                        <Table striped bordered size="sm">
                                            <thead>
                                                <tr>
                                                    <th>Season</th>
                                                    <th>Matches Played</th>
                                                    <th>Balls Faced</th>
                                                    <th>Runs Scored</th>
                                                    <th>4s</th>
                                                    <th>6s</th>
                                                    <th>Balls Bowled</th>
                                                    <th>Wickets Taken</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {(isFetching) && <Loader />}
                                                {error && <ErrorContainer errorMessage={error} />}
                                                {data &&
                                                    playerdetails &&
                                                    playerdetails.seasonStats &&
                                                    Object.keys(playerdetails.seasonStats).map(season => (
                                                        playerdetails.seasonStats[season].map(bstats =>
                                                            <tr key={`#id-player-${playerdetails.player_id}`}>
                                                                <td>
                                                                    {season}
                                                                </td>
                                                                <td>
                                                                    {bstats.matches_played}
                                                                </td>
                                                                <td>
                                                                    {bstats.balls_faced}
                                                                </td>
                                                                <td>
                                                                    {bstats.total_runs}
                                                                </td>
                                                                <td>
                                                                    {bstats.fours}
                                                                </td>
                                                                <td>
                                                                    {bstats.sixes}
                                                                </td>
                                                                <td>
                                                                    {bstats.balls_bowled}
                                                                </td>
                                                                <td>
                                                                    {bstats.total_wickets}
                                                                </td>
                                                            </tr>
                                                        )
                                                    ))}
                                            </tbody>
                                        </Table>
                                    </div>
                                    <br />
                                    <div>
                                        <div className="score">
                                            <span>Batting performance charts</span>{' '}
                                        </div> <br />
                                        <h4>Runs</h4>
                                        <Line data={runsData} /><br />
                                        <h4>Boundaries</h4>
                                        <Line data={boundariesData} /><br />
                                    </div>
                                    <div>
                                        <div className="score">
                                            <span>Bowling performance chart</span>{' '}
                                        </div>
                                        <Line data={ballsData} /><br /><br /><br />
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div >
        );
    }
}

Player.propTypes = {
    playerdetails: PropTypes.instanceOf(Object).isRequired,
    match: PropTypes.instanceOf(Object).isRequired,
    fetchplayerdetails: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ playerdetails: state.playerdetails });
const mapDispatchToProps = {
    fetchplayerdetails: playerid => fetchPlayerDetails(playerid)
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
