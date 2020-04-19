/* eslint-disable no-param-reassign */
export const VERSUS_FETCH = 'MATCHES_FETCH';
export const VERSUS_FETCHING = 'MATCHES_FETCHING';
export const VERSUS_FETCHED = 'MATCHES_FETCHED';
export const VERSUS_ERROR_FETCH = 'MATCHES_ERROR_FETCH';
export const UPDATE_SELECTED_SEASON = 'UPDATE_SELECTED_SEASON';

export const VERSUS_TYPE = {
    player: {
        name: 'Player',
        value: 'player'
    },
    team: {
        name: 'Team',
        value: 'team'
    }
};


export function ColorLuminance(hex, lum) {
    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    lum = lum || 0;

    // convert to decimal and change luminosity
    let rgb = "#"; let c; let i;
    for (i = 0; i < 3; i += 1) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += (`00${c}`).substr(c.length);
    }

    return rgb;
}

export function getRandomRolor() {
    const letters = '0123456789ABCDEF'.split('');
    let color = '#';
    for (let i = 0; i < 6; i += 1) {
        color += letters[Math.round(Math.random() * 10)];
    }
    return color;
}

export function randDarkColor() {
    const lum = -0.25;
    let hex = String(`#${Math.random().toString(16).slice(2, 8).toUpperCase()}`).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    let rgb = "#";
    let c; let i;
    for (i = 0; i < 3; i += 1) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += (`00${c}`).substr(c.length);
    }
    return rgb;
}