import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import Header from 'Components/Header';
import Loader from 'Components/Loader';
import SeasonSelect from 'Components/SeasonSelect';
// import { Form, Button } from 'react-bootstrap';
import { fetchMatches } from 'Containers/Matches/calls';

import PropTypes from 'prop-types';

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
        const {matches:{isFetching, error, data}, match} = this.props;
        const {selectedSeason, fakeLoader} = this.state;
        let teams = [];
        if(!isFetching && data && selectedSeason) {
            teams = data[selectedSeason.value];
        }
        
        return (
            <div id="matches">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Matches</title>
                </Helmet>
                <Header match={match}/>
                <div className="matches-wrapper">
                    <div className="dropdown-wrapper">
                        <SeasonSelect className="season-dropdown" onChange={this.changeSelect}/>
                        {!selectedSeason && <span className='drop-info'>Select a season to see match list</span>}
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
