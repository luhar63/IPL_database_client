import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { Table, Tabs, Tab } from 'react-bootstrap';

import { fetchPlayerDetails } from 'Containers/Player/calls';
import Header from 'Components/Header';
import Loader from 'Components/Loader';
import ErrorContainer from '../../components/ErrorContainer';
import './style.scss';

class Player extends Component {
    componentDidMount() {
        const { fetchplayerdetails, match } = this.props;
        fetchplayerdetails(match.params.playerid);
    }

    render() {
        const {
            playerdetails: { isFetching, error, data },
            match
        } = this.props;

        console.log(data);

        if (!isFetching && data) {
            const detail = data.playerdetails;
            return (
                <div id="player-details-wrapper">
                    <Helmet>
                        <meta charSet="utf-8" />
                        <title>{`${detail.TEAM_1_NAME} vs ${detail.TEAM_2_NAME}`}</title>
                    </Helmet>
                    <Header match={match} />
                    <div className="player-header">{`Season ${detail.SEASON_ID}: ${detail.TEAM_1_NAME} vs ${detail.TEAM_2_NAME}`}</div>
                    <div className="result">{`${detail.PLAYER_WINNNER_NAME} won by ${detail.WIN_MARGIN} ${detail.WIN_TYPE}`}</div>
                    <div className="scoreboard">
                        <Tabs
                            defaultActiveKey={`team#${detail.innings[0].batting[0].TEAM_BATTING_NAME}`}
                        >
                            {detail.innings.map(inning => (
                                <Tab
                                    className="player"
                                    key={`team#${inning.batting[0].TEAM_BATTING_NAME}`}
                                    eventKey={`team#${inning.batting[0].TEAM_BATTING_NAME}`}
                                    id={`inning#${inning.batting[0].TEAM_BATTING_NAME}`}
                                    title={`${inning.batting[0].TEAM_BATTING_NAME} Innings`}
                                >
                                    <div>
                                        <div className="score">
                                            <span>{`${inning.batting[0].TEAM_BATTING_NAME}`}</span>{' '}
                                            <span>{` ${inning.score}`}</span>
                                        </div>

                                        <Table striped bordered size="sm">
                                            <thead>
                                                <tr>
                                                    <th>Batsman</th>
                                                    <th>Wicket</th>
                                                    <th title="runs">R</th>
                                                    <th title="balls">B</th>
                                                    <th title="fours">4s</th>
                                                    <th title="sixes">6s</th>
                                                    <th title="Strike Rate">
                                                        SR
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {inning.batting.map(striker => (
                                                    <tr
                                                        key={`#id-striker-${striker.STRIKER_NAME}`}
                                                    >
                                                        <td>
                                                            {
                                                                striker.STRIKER_NAME
                                                            }
                                                        </td>
                                                        <td>
                                                            {striker.OUT_TYPE ===
                                                            '-1'
                                                                ? 'not out'
                                                                : this.getWicketOutput(
                                                                      striker
                                                                  )}
                                                        </td>
                                                        <td>
                                                            {
                                                                striker.RUNS_SCORED
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                striker.BALLS_FACED
                                                            }
                                                        </td>
                                                        <td>{striker.FOURS}</td>
                                                        <td>{striker.SIXES}</td>
                                                        <td>
                                                            {striker.STRIKE_RATE.toFixed(
                                                                2
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                                <tr>
                                                    <td>Extras</td>
                                                    <td>
                                                        {Object.keys(
                                                            inning.extras
                                                        ).map(
                                                            (k, _i) =>
                                                                `${k}: ${inning.extras[k]} `
                                                        )}
                                                    </td>
                                                </tr>
                                                {this.getDidNotBat(inning) && (
                                                    <tr>
                                                        <td>Did not bat</td>
                                                        <td>
                                                            {this.getDidNotBat(
                                                                inning
                                                            )}
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </Table>
                                        <Table striped bordered size="sm">
                                            <thead>
                                                <tr>
                                                    <th>Bowler</th>
                                                    <th title="over">O</th>
                                                    <th title="runs">R</th>
                                                    <th title="wickets">W</th>
                                                    <th title="no balls">NB</th>
                                                    <th title="wides">WD</th>
                                                    <th title="economy">ECO</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {inning.bowling.map(bowler => (
                                                    <tr
                                                        key={`#id-bowler-${bowler.BOWLER_NAME}`}
                                                    >
                                                        <td>
                                                            {bowler.BOWLER_NAME}
                                                        </td>
                                                        <td>{bowler.OVERS}</td>
                                                        <td>
                                                            {bowler.EXTRA_RUNS_GIVEN +
                                                                bowler.RUNS_GIVEN}
                                                        </td>
                                                        <td>
                                                            {bowler.WICKETS}
                                                        </td>
                                                        <td>
                                                            {
                                                                bowler.NOBALL_COUNT
                                                            }
                                                        </td>
                                                        <td>
                                                            {bowler.WIDE_COUNT}
                                                        </td>
                                                        <td>{`${(
                                                            (bowler.EXTRA_RUNS_GIVEN +
                                                                bowler.RUNS_GIVEN) /
                                                            bowler.OVERS
                                                        ).toFixed(2)}`}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </div>
                                </Tab>
                            ))}
                        </Tabs>

                        <div className="player-info">
                            <h5>Player Info</h5>
                            <Table size="sm">
                                <tbody>
                                    <tr>
                                        <td>Date</td>
                                        <td>
                                            {detail.PLAYER_DATE.substring(
                                                0,
                                                10
                                            )}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Venue</td>
                                        <td>{detail.VENUE_NAME}</td>
                                    </tr>
                                    <tr>
                                        <td>Man of the Player</td>
                                        <td>{detail.MAN_OF_THE_PLAYER_NAME}</td>
                                    </tr>
                                    <tr>
                                        <td>Venue</td>
                                        <td>{detail.VENUE_NAME}</td>
                                    </tr>
                                    <tr>
                                        <td>Toss</td>
                                        <td>{`${detail.TOSS_WINNNER_NAME} won the toss and opt to ${detail.TOSS_DECISION}`}</td>
                                    </tr>
                                    <tr>
                                        <td>{`${detail.innings[0].batting[0].TEAM_BATTING_NAME} squad`}</td>
                                        <td>
                                            {detail.innings[0].squad.join(', ')}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>{`${detail.innings[1].batting[0].TEAM_BATTING_NAME} squad`}</td>
                                        <td>
                                            {detail.innings[1].squad.join(', ')}
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            );
        }
        if (error) {
            return (
                <div id="player-details-wrapper">
                    <Helmet>
                        <meta charSet="utf-8" />
                        <title>Loading</title>
                    </Helmet>
                    <Header match={match} />
                    <ErrorContainer errorMessage={error} />
                </div>
            );
        }
        return (
            <div id="player-details-wrapper">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Loading</title>
                </Helmet>
                <Header match={match} />
                <Loader />
            </div>
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
