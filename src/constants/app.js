import React from 'react';

export const appName = 'APPNAME';
export const logoPath = '';

export function getMessage(type, message) {
    switch (type) {
    case 'success':
        return (
            <div className="success-text">
                <i className="fa fa-info-circle" />
                <span className="error-message">{message}</span>
            </div>
        );
    case 'error':
        return (
            <div className="error-text">
                <i className="fa fa-info-circle" />
                <span className="error-message">{message}</span>
            </div>
        );
    default:
        return (
            <div className="info-text">
                <i className="fa fa-info-circle" />
                <span className="error-message">{message}</span>
            </div>
        );
    }
}

export function getClasses(type) {
    switch (type) {
    case 'success':
        return 'toast success';
    case 'error':
        return 'toast error';
    default:
        return 'toast default';
    }
}
