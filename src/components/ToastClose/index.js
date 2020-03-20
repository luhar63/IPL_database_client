import React from 'react';
import PropTypes from 'prop-types';

function CloseButton({ className, closeToast }) {
    return (
        <i
            className={className}
            onClick={closeToast}
            role="presentation"
            onKeyPress={() => {}}
        />
    );
}

CloseButton.propTypes = {
    closeToast: PropTypes.func,
    className: PropTypes.string
};

CloseButton.getDefaultProps = {
    className: '',
    closeToast: () => {}
};

export default CloseButton;
