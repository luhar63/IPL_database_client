import {
    MATCHES_FETCH,
    MATCHES_FETCHING,
    MATCHES_FETCHED,
    MATCHES_ERROR_FETCH,
    UPDATE_SELECTED_SEASON
} from './constant';

export function matchesFetchAction() {
    return {
        type: MATCHES_FETCH
    };
}

export function matchesFetchingAction() {
    return {
        type: MATCHES_FETCHING
    };
}

export function matchesFetchedAction(payload) {
    return {
        type: MATCHES_FETCHED,
        payload
    };
}

export function matchesErrorFetchAction(error) {
    return {
        type: MATCHES_ERROR_FETCH,
        error
    };
}

export function updateSelectedSeasonAction(payload) {
    return {
        type: UPDATE_SELECTED_SEASON,
        payload
    };
}
