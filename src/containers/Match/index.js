import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

import { fetchMatchDetails } from 'Containers/Match/calls';
import Header from 'Components/Header';
import ErrorContainer from '../../components/ErrorContainer';
import './style.scss';

class Match extends Component {

    componentDidMount() {
        const { fetchmatchdetails, match } = this.props;
        fetchmatchdetails(match.params.matchid);
    }

    render() {
        const {
            matchdetails: { isFetching, error, data },
            match 
        } = this.props;
        
        if (!isFetching && data) {
            const detail = data.matchdetails;
            console.log(detail);
            return (<div id="match-details-wrapper">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>{`${detail.TEAM_1_NAME} vs ${detail.TEAM_2_NAME}`}</title>
                </Helmet>
                <Header match={match} />
                <p style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>{`Season ${detail.SEASON_ID}: ${detail.TEAM_1_NAME} vs ${detail.TEAM_2_NAME}`}</p>
                {`${detail.MATCH_WINNNER_NAME} won by ${detail.WIN_MARGIN} ${detail.WIN_TYPE}`}
                {detail.innings.map((inning) =>
                    <div
                        className="match"
                        key={`team#${inning.batting[0].TEAM_BATTING_NAME}`}
                        id={`inning#${inning.batting[0].TEAM_BATTING_NAME}`}
                    >
                        <div>
                            {`${inning.batting[0].TEAM_BATTING_NAME} Innings`}
                            {` ${inning.score}`}
                            <Table striped bordered hover>                   
                                <thead>
                                    <tr>
                                        <th>Batsman</th>
                                        <th>Wicket</th>
                                        <th>R</th>
                                        <th>B</th>
                                        <th>4s</th>
                                        <th>6s</th>
                                        <th>SR</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {inning.batting.map((striker) => 
                                        <tr>
                                            <td>{striker.STRIKER_NAME}</td>
                                            <td>{
                                                (striker.OUT_TYPE==='-1') ? ('not out') : getWicketOutput(striker)
                                            }</td>
                                            <td>{striker.RUNS_SCORED}</td>
                                            <td>{striker.BALLS_FACED}</td>
                                            <td>{striker.FOURS}</td>
                                            <td>{striker.SIXES}</td>
                                            <td>{striker.STRIKE_RATE}</td>
                                        </tr>)
                                    }
                                    <tr>
                                        <td>Extras</td>
                                        <td>{Object.keys(inning.extras).map((k, i) => `${k}: ${inning.extras[k]} `)}</td>
                                    </tr>
                                    {getDidNotBat(inning) && <tr>
                                        <td>Did not bat</td>
                                        <td>{getDidNotBat(inning)}</td>
                                    </tr>}
                                </tbody>
                            </Table>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Bowler</th>
                                        <th>O</th>
                                        <th>R</th>
                                        <th>W</th>
                                        <th>NB</th>
                                        <th>WD</th>
                                        <th>ECO</th>
                                    </tr>
                                </thead>
                                
                                <tbody>
                                    {inning.bowling.map((bowler) => 
                                        <tr>
                                            <td>{bowler.BOWLER_NAME}</td>
                                            <td>{bowler.OVERS}</td>
                                            <td>{bowler.RUNS_GIVEN}</td>
                                            <td>{bowler.WICKETS}</td>
                                            <td>{bowler.NOBALL_COUNT}</td>
                                            <td>{bowler.WIDE_COUNT}</td>
                                            <td>{`${((bowler.EXTRA_RUNS_GIVEN+bowler.RUNS_GIVEN)/bowler.OVERS).toFixed(2)}`}</td>
                                        </tr>)
                                    }    
                                </tbody>
                            </Table>      
                        </div>
                    </div>
                )}
                <Table striped bordered hover>
                    <tbody>
                        <tr>
                            <td>Date</td>
                            <td>{detail.MATCH_DATE.substring(0,10)}</td>
                        </tr>
                        <tr>
                            <td>Venue</td>
                            <td>{detail.VENUE_NAME}</td>
                        </tr>
                        <tr>
                            <td>Man of the Match</td>
                            <td>{detail.MAN_OF_THE_MATCH_NAME}</td>
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
                            <td>{detail.innings[0].squad.join(', ')}</td>
                        </tr>
                        <tr>
                            <td>{`${detail.innings[1].batting[0].TEAM_BATTING_NAME} squad`}</td>
                            <td>{detail.innings[1].squad.join(', ')}</td>
                        </tr>
                    </tbody>   
                </Table>
            </div>);
        }
        if(error)
        {
            return (<ErrorContainer errorMessage={error} />);
        }
        return <div id="match-details-wrapper">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Loading</title>
            </Helmet>
        </div>;
    }
}
const getWicketOutput = (striker) => { 
    switch (striker.OUT_TYPE){
    case 'run out':
        return  (<span>run out ({striker.BOWLER_NAME}/{striker.FIELDER_NAME})</span> ) ;  
    case 'bowled':
    case 'lbw':
    case 'hit wicket':
        return (<span>b {striker.BOWLER_NAME}</span>);
    case 'stumped':
        return (<span>b {striker.BOWLER_NAME} s {striker.FIELDER_NAME}</span>);
    case 'caught':
        return (<span>b {striker.BOWLER_NAME} c {striker.FIELDER_NAME}</span>);
    case 'caught and bowled':
        return (<span>b {striker.BOWLER_NAME} c {striker.BOWLER_NAME}</span>);
    case 'retired hurt':
        return (<span>retired hurt</span>);
    case 'obstructing the field':
        return (<span>obstructing the field</span>);
    default:
        return (<span>not out</span>);
    }
    
}; 
Match.propTypes = {
    matchdetails: PropTypes.instanceOf(Object).isRequired,
    
    fetchmatchdetails: PropTypes.func.isRequired,
    match: PropTypes.instanceOf(Object).isRequired
};

const getDidNotBat = (inning) => inning.squad.filter((b) => {
    return !inning.batting.map((batsman) => batsman.STRIKER_NAME).includes(b[0]);}).join(', ');
const mapStateToProps = state => ({ matchdetails: state.matchdetails });
const mapDispatchToProps = {
    fetchmatchdetails: (matchid) => fetchMatchDetails(matchid)
};

export default connect(mapStateToProps, mapDispatchToProps)(Match);
