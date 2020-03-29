import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

function ErrorContainer({ className, errorMessage }) {
    const classname = `error-container ${className||''}`;
    return (
        <div className={classname}> <div className="error-message">{errorMessage}</div></div>
       
    );
}

ErrorContainer.propTypes = {
    className: PropTypes.string,
    errorMessage: PropTypes.string.isRequired
};

ErrorContainer.getDefaultProps = {
    className: '',

};

export default ErrorContainer;
