import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
// import mainLogo from 'Assets/images/logo.png';

function Loader({ className }) {
    const classname = `lds-ellipsis ${className}`;
    return (
        <div className={classname}><div></div><div></div><div></div><div></div></div>
    );
}

Loader.propTypes = {
    className: PropTypes.string
};

Loader.getDefaultProps = {
    className: '',
};

export default Loader;
