import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Header from 'Components/Header';
import Loader from 'Components/Loader';
import TeamSelect from 'Components/TeamSelect';
// import { Form, Button } from 'react-bootstrap';
import { fetchPlayers } from 'Containers/Players/calls';

import PropTypes from 'prop-types';

import './style.scss';
import ErrorContainer from '../../components/ErrorContainer';

class Players extends Component {
    state = {
        fakeLoader: false
    };

    componentDidMount() {
        const { fetchplayers } = this.props;
        fetchplayers();
    }

    changeSelect = selectedTeam => {
        this.setState({
            fakeLoader: true
        });
        setTimeout(() => {
            this.setState({
                selectedTeam,
                fakeLoader: false
            });
        }, 1000);
    };

    render() {
        const {
            players: { isFetching, error, data },
            match
        } = this.props;
        const { selectedTeam, fakeLoader } = this.state;
        let players = [];
        if (!isFetching && data && selectedTeam) {
            players = data[selectedTeam.value];
        }

        return (
            <div id="players">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Players</title>
                </Helmet>
                <Header match={match} />
                <div className="players-wrapper">

                    <div className="dropdown-wrapper">
                        <TeamSelect
                            value={selectedTeam}
                            className="team-dropdown"
                            onChange={this.changeSelect}
                        />
                        {!selectedTeam && (
                            <span className="drop-info">
                                Select a team to see player list
                            </span>
                        )}
                    </div>
                    <div className="player-list-wrapper">
                        {(isFetching || fakeLoader) && <Loader />}
                        {error && <ErrorContainer errorMessage={error} />}
                        {data &&
                            players &&
                            players.map(player => (
                                <Link
                                    to={`/player/${player.player_id}`}
                                    key={`player#${player.player_id}`}
                                >
                                    <div
                                        className="player"
                                        key={`player#${player.player_id}`}
                                        id={`player#${player.player_id}`}
                                    >
                                        <div className={`team-sprite small team-${player.team_id}`}></div>
                                        {player.player_name}
                                    </div>
                                </Link>
                            ))}
                    </div>
                </div>
            </div>
        );
    }
}
Players.propTypes = {
    // children: PropTypes.element
    // resetLogin: PropTypes.func.isRequired,
    fetchplayers: PropTypes.func.isRequired,
    players: PropTypes.instanceOf(Object).isRequired,
    match: PropTypes.instanceOf(Object).isRequired
};
const mapStateToProps = state => ({ players: state.players });
const mapDispatchToProps = {
    fetchplayers: fetchPlayers
};

export default connect(mapStateToProps, mapDispatchToProps)(Players);
