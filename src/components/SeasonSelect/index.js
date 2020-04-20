import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';
import { fetchSeasons } from '../../actions/season';

import './style.scss';
// import mainLogo from 'Assets/images/logo.png';

class SeasonSelect extends Component {
    componentDidMount() {
        const { seasonFetch, season } = this.props;
        if (season.data == null) {
            seasonFetch();
        }
    }

    render() {
        const {
            className,
            season,
            showAll,
            onChange,
            showAllValue,
            value
        } = this.props;
        let options = [];
        if (season.data && Array.isArray(season.data)) {
            options = season.data.map(item => ({
                value: item.id,
                label: `Season ${item.id} (${item.year})`
            }));
            if (showAll) {
                options.splice(0, 0, showAllValue);
            }
        }
        return (
            <Select
                name="season"
                value={value}
                defaultValue={showAllValue}
                placeholder="Select Season"
                onChange={onChange}
                className={className}
                isLoading={season.isFetching}
                options={options}
            />
        );
    }
}

SeasonSelect.propTypes = {
    className: PropTypes.string,
    value: PropTypes.objectOf(Object),
    seasonFetch: PropTypes.func.isRequired,
    season: PropTypes.objectOf(Object).isRequired,
    showAll: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    showAllValue: PropTypes.instanceOf(Object)
};

SeasonSelect.getDefaultProps = {
    className: '',
    showAll: false,
    showAllValue: '',
    value: null
};

const mapStateToProps = state => ({ season: state.season });
const mapDispatchToProps = {
    seasonFetch: fetchSeasons
};

export default connect(mapStateToProps, mapDispatchToProps)(SeasonSelect);
