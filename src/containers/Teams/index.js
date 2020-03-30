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

class Teams extends Component {
    state = {
        defaultSeasonValue: {value:'all', label:'All Seasons'},
        selectedSeason: {value:'all', label:'All Seasons'},
        fakeLoader: false
    };

    componentDidMount() {
        const { fetchteams } = this.props;
        fetchteams();
    }

    changeSelect =(selectedSeason) => {
        this.setState({
            
            fakeLoader: true
        });
        setTimeout(() => {
            this.setState({
                selectedSeason,
                fakeLoader: false
            });
        }, 1000);
    }

    render() {
        const {teams:{isFetching, error, data}, match} = this.props;
        const {selectedSeason, defaultSeasonValue, fakeLoader} = this.state;
        let teams = [];
        if(!isFetching && data && selectedSeason) {
            teams = data[selectedSeason.value];
        }
        
        return (
            <div id="teams">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Teams</title>
                </Helmet>
                <Header match={match}/>
                <div className="teams-wrapper">
                    <div className="dropdown-wrapper">
                        <SeasonSelect className="season-dropdown" onChange={this.changeSelect} showAll showAllValue={defaultSeasonValue}/>
                    </div>
                    <div className="team-list-wrapper">
                        {(isFetching || fakeLoader) && <Loader />}
                        {error && <ErrorContainer errorMessage={error} />}
                        {data && teams && 
                            teams.map((team) => (
                                <div className="team" key={`team#${team.id}`} id={`team#${team.id}`}>
                                    <div className={`team-sprite small team-${team.id}` }></div>{team.name}
                                </div>)
                            )
                        }
                    </div>
                </div>
            </div>
        );
    }
}
Teams.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Teams);
