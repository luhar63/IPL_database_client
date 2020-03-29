import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';
import { fetchSeasons } from '../../actions/season';

import './style.scss';
// import mainLogo from 'Assets/images/logo.png';

class SeasonSelect extends Component {
    
    componentDidMount() {
        const { seasonFetch, season } = this.props;
        if(season.data == null) {
            seasonFetch();
        }
    }

    render(){
        const {className, season} = this.props;
        let options = [];
        if(season.data) {
            options = season.data.map((item)=>({value: item.id,
                label: `Season ${item.id} (${item.year})`}));
        }
        return (
            <Select placeholder="Select Season" className={className} isLoading={season.isFetching} options={options} />
        );
    }
}

SeasonSelect.propTypes = {
    className: PropTypes.string,
    seasonFetch: PropTypes.func.isRequired,
    season: PropTypes.objectOf(Object).isRequired
};

SeasonSelect.getDefaultProps = {
    className: ''
};

const mapStateToProps = state => ({ season: state.season });
const mapDispatchToProps = {
    seasonFetch: fetchSeasons
};

export default connect(mapStateToProps, mapDispatchToProps)(SeasonSelect);
