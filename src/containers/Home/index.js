import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import Header from 'Components/Header';
import { Form, Button } from 'react-bootstrap';
import Loader from 'Components/Loader';
import { searchFetch, searchReset, tuplesFetch } from 'Containers/Home/calls';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ErrorContainer from '../../components/ErrorContainer';

import './style.scss';

class Home extends Component {
    state = {
        search: ''
    };

    componentWillUnmount() {
        const { resetSearch } = this.props;
        resetSearch();
    }

    submitForm = e => {
        const { fetchSearch } = this.props;
        e.preventDefault();
        const { search } = this.state;
        fetchSearch(search);
    };

    handleChange = (label, e) => {
        this.setState({
            [label]: e.target.value
        });
    };

    getTuples = () => {
        const { fetchtuples } = this.props;
        fetchtuples();
    };

    render() {
        const { search } = this.state;
        const {
            search: { isFetching, error, data },
            tuples,
            match
        } = this.props;
        return (
            <div>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Login</title>
                </Helmet>
                <Header match={match} />
                <div className="header"></div>
                <h1 className="text-center">An Indian Premier League</h1>
                <h1 className="text-center">Cheatsheet</h1>
                <div className="form-wrapper">
                    <Form className="search-form" onSubmit={this.submitForm}>
                        <Form.Group controlId="formBasic">
                            <Form.Control
                                type="text"
                                value={search}
                                onChange={(e) => { this.handleChange('search', e); }}
                                placeholder="Search player/team"
                            />
                        </Form.Group>
                        <button className="btn btn-secondary" type="button">
                            <i className="fa fa-search"></i>
                        </button>
                    </Form>
                </div>
                {(isFetching) && <Loader />}
                {error && <ErrorContainer errorMessage={error} />}
                {data && (<div className="body">
                    <h5>Search result</h5>
                    {data.players && data.players.length !== 0 && (
                        <div className="players">
                            Matching players found:
                            {data.players.map(player => {
                                return (<div>
                                    <Link
                                        to={`/player/${player.ID}`}
                                    >
                                        {player.NAME}
                                    </Link>
                                </div>);
                            })}
                        </div>
                    )
                    }
                    {data.teams && data.teams.length !== 0 && (
                        <div className="match">
                            Matching teams found:
                            {data.teams.map(team => {
                                return (<div>
                                    <Link
                                        to={`/team/${team.ID}`}
                                    >
                                        {team.NAME}
                                    </Link>
                                </div>);
                            })}
                        </div>
                    )
                    }
                </div>)
                }
                <div className="tuples">
                    <Button onClick={this.getTuples} variant="danger">How many tuples do we have?</Button>
                    {tuples.isFetching && <Loader />}
                    {error && <ErrorContainer errorMessage={tuples.error} />}
                    {!tuples.isFetching && tuples.data && <div className="tuple-record">
                        We have {tuples.data[0].toLocaleString()} tuples in our database.
                    </div>}
                </div>
            </div>
        );
    }
}
Home.propTypes = {
    // children: PropTypes.element
    resetSearch: PropTypes.func.isRequired,
    fetchSearch: PropTypes.func.isRequired,
    fetchtuples: PropTypes.func.isRequired,
    search: PropTypes.instanceOf(Object).isRequired,
    tuples: PropTypes.instanceOf(Object).isRequired,
    match: PropTypes.instanceOf(Object).isRequired

};
const mapStateToProps = state => ({
    search: state.home.search,
    tuples: state.home.tuples
});
const mapDispatchToProps = {
    fetchSearch: searchFetch,
    resetSearch: searchReset,
    fetchtuples: tuplesFetch
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
