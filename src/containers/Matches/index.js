import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from 'Components/Header';
import Loader from 'Components/Loader';
import SeasonSelect from 'Components/SeasonSelect';
// import { Form, Button } from 'react-bootstrap';
import { fetchMatches } from 'Containers/Matches/calls';
import './style.scss';
import ErrorContainer from '../../components/ErrorContainer';

class Matches extends Component {
    state = {
        selectedSeason: null,
        fakeLoader: false
    };

    componentDidMount() {
        const { fetchmatches } = this.props;
        fetchmatches();
    }

    changeSelect = selectedSeason => {
        this.setState({
            fakeLoader: true
        });
        setTimeout(() => {
            this.setState({
                selectedSeason,
                fakeLoader: false
            });
        }, 1000);
    };

    render() {
        const {
            matches: { isFetching, error, data },
            match
        } = this.props;
        const { selectedSeason, fakeLoader } = this.state;
        let matches = [];
        let teamMeta = {};
        if (!isFetching && data && selectedSeason) {
            matches = data.matches[selectedSeason.value];
            teamMeta = data.meta.teams;
        }

        return (
            <div id="matches">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Matches</title>
                </Helmet>
                <Header match={match} />
                <div className="matches-wrapper">
                    <div className="dropdown-wrapper">
                        <SeasonSelect
                            className="season-dropdown"
                            onChange={this.changeSelect}
                        />
                        {!selectedSeason && (
                            <span className="drop-info">
                                Select a season to see match list
                            </span>
                        )}
                    </div>
                    <div className="match-list-wrapper">
                        {(isFetching || fakeLoader) && <Loader />}
                        {error && <ErrorContainer errorMessage={error} />}
                        {data &&
                            matches &&
                            matches.map(item => (
                                <Link to={`/match/${item.id}`}>
                                    <div
                                        className="match"
                                        key={`team#${item.id}`}
                                        id={`match#${item.id}`}
                                    >
                                        <div
                                            className={`match-team-1 ${
                                                item.team_winner_id ===
                                                item.team_1_id
                                                    ? 'winner'
                                                    : 'loser'
                                            }`}
                                        >
                                            <div
                                                className={`team-sprite small team-${item.team_1_id}`}
                                            ></div>
                                            {teamMeta[item.team_1_id]}
                                        </div>
                                        <div className="vs-details">
                                            <div className="vs"></div>
                                            <div>
                                                {new Date(
                                                    item.match_date
                                                ).toDateString()}
                                            </div>
                                            <div>
                                                {item.venue}, {item.city}
                                            </div>
                                        </div>
                                        <div
                                            className={`match-team-2 ${
                                                item.team_winner_id ===
                                                item.team_2_id
                                                    ? 'winner'
                                                    : 'loser'
                                            }`}
                                        >
                                            <div
                                                className={`team-sprite small team-${item.team_2_id}`}
                                            ></div>
                                            {teamMeta[item.team_2_id]}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                    </div>
                </div>
            </div>
        );
    }
}
Matches.propTypes = {
    // children: PropTypes.element
    // resetLogin: PropTypes.func.isRequired,
    fetchmatches: PropTypes.func.isRequired,
    matches: PropTypes.instanceOf(Object).isRequired,
    match: PropTypes.instanceOf(Object).isRequired
};
const mapStateToProps = state => ({ matches: state.matches });
const mapDispatchToProps = {
    fetchmatches: fetchMatches
};

export default connect(mapStateToProps, mapDispatchToProps)(Matches);
