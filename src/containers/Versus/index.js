/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import Header from 'Components/Header';
import Loader from 'Components/Loader';
import { Tabs, Tab, Button } from 'react-bootstrap';
import { fetchComparison } from 'Containers/Versus/calls';
import PlayerSelect from 'Components/PlayerSelect';
import TeamSelect from 'Components/TeamSelect';
import { Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import './style.scss';
import { VERSUS_TYPE, randDarkColor } from './constant';
import ErrorContainer from '../../components/ErrorContainer';

class Versus extends Component {
    state = {
        selectedType: VERSUS_TYPE.player.value,
        playerOne: null,
        playerTwo: null,
        teamOne: null,
        teamTwo: null
    }

    // componentDidMount() {
    //     const { fetchmatches, matches } = this.props;
    //     if (matches.data == null) {
    //         fetchmatches();
    //     }
    // }

    changePlayerOne = (selectedPlayer) => {
        this.setState({
            playerOne: selectedPlayer
        });
    };

    changePlayerTwo = (selectedPlayer) => {
        this.setState({
            playerTwo: selectedPlayer
        });
    }

    changeTeamOne = (selectedTeam) => {
        this.setState({
            teamOne: selectedTeam
        });
    };

    changeTeamTwo = (selectedTeam) => {
        this.setState({
            teamTwo: selectedTeam
        });
    }

    changeTab = (tabValue) => {
        this.setState({
            selectedType: tabValue
        });
    };

    compareThem = () => {
        const { fetchcomparison } = this.props;
        const { selectedType } = this.state;
        if (selectedType === 'player') {
            const { playerOne, playerTwo } = this.state;
            fetchcomparison(selectedType, playerOne.value, playerTwo.value);
        }
        if (selectedType === 'team') {
            const { teamOne, teamTwo } = this.state;
            fetchcomparison(selectedType, teamOne.value, teamTwo.value);
        }

    };

    createData = (name, key, data) => {
        const { selectedType } = this.state;
        const labels = ['Season 1', 'Season 2', 'Season 3', 'Season 4', 'Season 5', 'Season 6', 'Season 7', 'Season 8', 'Season 9'];
        const list1 = new Array(9);;
        list1.fill(null);
        const list2 = new Array(9);;
        list2.fill(null);
        let compare1Name;
        let compare2Name;
        if (selectedType === 'player' && data.p1 && data.p2) {

            compare1Name = data.p1[0].PLAYER_NAME;
            // compare1Id = data.p1[0].PLAYER_ID;
            compare2Name = data.p2[0].PLAYER_NAME;
            // compare2Id = data.p2[0].PLAYER_ID;
            data.p1.forEach(element => {
                list1[element.SEASON_ID - 1] = element[key] ? element[key].toFixed() : null;
                // player_bowling_1[element.SEASON_ID - 1] = element.AVG_BOWLING ? element.AVG_BOWLING.toFixed() : null;
            });
            data.p2.forEach(element => {
                list2[element.SEASON_ID - 1] = element[key] ? element[key].toFixed() : null;
            });
            // console.log(player_batting_1, player_batting_2);
        }

        if (selectedType === 'team' && data.t1 && data.t2) {

            compare1Name = data.t1[0].TEAM_NAME;
            // compare1Id = data.p1[0].PLAYER_ID;
            compare2Name = data.t2[0].TEAM_NAME;
            // compare2Id = data.p2[0].PLAYER_ID;
            data.t1.forEach(element => {
                list1[element.SEASON_ID - 1] = element[key] ? element[key].toFixed() : null;
                // player_bowling_1[element.SEASON_ID - 1] = element.AVG_BOWLING ? element.AVG_BOWLING.toFixed() : null;
            });
            data.t2.forEach(element => {
                list2[element.SEASON_ID - 1] = element[key] ? element[key].toFixed() : null;
            });
            // console.log(player_batting_1, player_batting_2);
        }
        const color1 = randDarkColor();
        const color2 = randDarkColor();
        return {
            labels,
            datasets: [{
                label: `${compare1Name} ${name}`,
                fill: false,
                lineTension: 0.1,
                backgroundColor: color1,
                borderColor: color1,
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: color1,
                pointBackgroundColor: color1,
                pointBorderWidth: 2,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: color1,
                pointHoverBorderColor: color1,
                pointHoverBorderWidth: 2,
                pointRadius: 2,
                pointHitRadius: 10,
                data: list1
            },
            {
                label: `${compare2Name} ${name}`,
                fill: false,
                lineTension: 0.1,
                backgroundColor: color2,
                borderColor: color2,
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: color2,
                pointBackgroundColor: color2,
                pointBorderWidth: 2,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: color2,
                pointHoverBorderColor: color2,
                pointHoverBorderWidth: 2,
                pointRadius: 2,
                pointHitRadius: 10,
                data: list2
            }
            ],
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        };
    }

    render() {
        const {
            matches: { isFetching, error, data },
            match
        } = this.props;
        const { selectedType, playerOne, playerTwo, teamOne, teamTwo } = this.state;
        // let matches = [];
        // let teamMeta = {};
        let compare1Name;
        let compare1Id;
        let compare2Name;
        let compare2Id;

        if (!isFetching && data) {
            if (selectedType === 'player' && data.p1 && data.p2) {
                compare1Name = data.p1[0].PLAYER_NAME;
                compare1Id = data.p1[0].PLAYER_ID;
                compare2Name = data.p2[0].PLAYER_NAME;
                compare2Id = data.p2[0].PLAYER_ID;
            }
            if (selectedType === 'team' && data.t1 && data.t2) {
                compare1Name = data.t1[0].TEAM_NAME;
                compare1Id = data.t1[0].TEAM_ID;
                compare2Name = data.t2[0].TEAM_NAME;
                compare2Id = data.t2[0].TEAM_ID;
            }
        }

        return (
            <div id="matches">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Versus</title>
                </Helmet>
                <Header match={match} />
                <div className="matches-wrapper">
                    <div className="match-list-wrapper">
                        <Tabs
                            defaultActiveKey={`${selectedType}`}
                            onSelect={(k) => {
                                this.changeTab(k);
                            }
                            }
                        >
                            {Object.keys(VERSUS_TYPE).map((type) => (
                                // eslint-disable-next-line react/jsx-no-bind
                                <Tab key={`${type}`} eventKey={`${type}`} title={`${VERSUS_TYPE[type].name} Versus`}>
                                    <div className="versus-header">
                                        {selectedType === 'player' ? (
                                            <div className='head-warpper'>
                                                <div className="player-versus">
                                                    <PlayerSelect value={playerOne}
                                                        className="player-dropdown"
                                                        onChange={this.changePlayerOne} />
                                                    <span>VS</span>
                                                    <PlayerSelect value={playerTwo}
                                                        className="player-dropdown"
                                                        onChange={this.changePlayerTwo} />
                                                </div>
                                                <div className="compare">
                                                    <Button onClick={this.compareThem} variant="danger" disabled={(!playerOne || !playerTwo || JSON.stringify(playerOne) === JSON.stringify(playerTwo))}>Compare</Button>
                                                    {(!playerOne || !playerTwo) ? <p className='info'><i>Please select two players to compare </i></p> : (JSON.stringify(playerOne) === JSON.stringify(playerTwo) ? <p className='info'><i>Please select different players to compare</i></p> : '')}
                                                </div>

                                            </div>

                                        ) : (<div className='head-warpper'>
                                            <div className="player-versus">
                                                <TeamSelect value={teamOne}
                                                    className="player-dropdown"
                                                    onChange={this.changeTeamOne} />
                                                <span>VS</span>
                                                <TeamSelect value={teamTwo}
                                                    className="player-dropdown"
                                                    onChange={this.changeTeamTwo} />
                                            </div>
                                            <div className="compare">
                                                <Button onClick={this.compareThem} variant="danger" disabled={(!teamOne || !teamTwo || JSON.stringify(teamOne) === JSON.stringify(teamTwo))}>Compare</Button>
                                                {(!teamOne || !teamTwo) ? <p className='info'><i>Please select two teams to compare </i></p> : (JSON.stringify(teamOne) === JSON.stringify(teamTwo) ? <p className='info'><i>Please select different teams to compare</i></p> : '')}
                                            </div>
                                        </div>)}

                                    </div>
                                </Tab>
                            )
                            )}
                        </Tabs>

                        {(isFetching) && <Loader />}
                        {error && <ErrorContainer errorMessage={error} />}
                        {selectedType === 'player' && data && data.p1 && data.p2 && (
                            <div>
                                <div className="hhead">
                                    <Link
                                        to={`/player/${compare1Id}`}
                                    >
                                        {compare1Name}
                                    </Link>
                                    <span >vs</span>
                                    <Link
                                        to={`/player/${compare2Id}`}
                                    >
                                        {compare2Name}
                                    </Link>
                                </div>
                                <div className="versus-body">
                                    <div className="batting">
                                        <h4>Batting Average trend</h4>
                                        <Line data={this.createData('batting average', 'AVG_BATTING', data)} />
                                    </div>

                                    <div className="bowling">
                                        <h4>Bowling Average trend <span>(Lower is better)</span></h4>
                                        <Line data={this.createData('bowling average', 'AVG_BOWLING', data)} />
                                    </div>
                                </div>
                                <div className="versus-body">
                                    <div className="batting">
                                        <h4>Strike rate batting trend </h4>
                                        <Line data={this.createData('Strike rate batting', 'SR_BATTING', data)} />
                                    </div>
                                    <div className="bowling">
                                        <h4>Strike rate bowling trend <span>(Lower is better)</span></h4>
                                        <Line data={this.createData('Strike rate bowling', 'SR_BOWLING', data)} />
                                    </div>
                                </div>
                                <div className="versus-body">
                                    <div className="batting">
                                        <h4>Runs scored trend</h4>
                                        <Line data={this.createData('Total runs scored', 'RUNS_SCORED', data)} />
                                    </div>
                                    <div className="bowling">
                                        <h4>Bowling economy trend <span>(Lower is better)</span></h4>
                                        <Line data={this.createData('Economy', 'ECO', data)} />
                                    </div>
                                </div>
                            </div>

                        )
                        }
                        {selectedType === 'team' && data && data.t1 && data.t2 && (<div className="team-versus">
                            <div className="hhead">
                                <Link
                                    to={`/team/${compare1Id}`}
                                >
                                    {compare1Name}
                                </Link>
                                <span >vs</span>
                                <Link
                                    to={`/team/${compare2Id}`}
                                >
                                    {compare2Name}
                                </Link>
                            </div>
                            <div className="versus-body">
                                <div className="team">
                                    <h4>Performance trend</h4>
                                    <Line data={this.createData('points', 'POINTS', data)} />
                                </div>
                            </div>
                        </div>)}
                    </div>
                </div>
            </div >
        );
    }
}
Versus.propTypes = {
    // children: PropTypes.element
    // resetLogin: PropTypes.func.isRequired,
    fetchcomparison: PropTypes.func.isRequired,
    matches: PropTypes.instanceOf(Object).isRequired,
    match: PropTypes.instanceOf(Object).isRequired,
    // updateselectedseason: PropTypes.func.isRequired
};
const mapStateToProps = state => ({ matches: state.matches });
const mapDispatchToProps = {
    fetchcomparison: fetchComparison
};

export default connect(mapStateToProps, mapDispatchToProps)(Versus);
