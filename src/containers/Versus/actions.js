import {
    VERSUS_FETCH,
    VERSUS_FETCHING,
    VERSUS_FETCHED,
    VERSUS_ERROR_FETCH,
    UPDATE_SELECTED_SEASON
} from './constant';

export function versusFetchAction() {
    return {
        type: VERSUS_FETCH
    };
}

export function versusFetchingAction() {
    return {
        type: VERSUS_FETCHING
    };
}

export function versusFetchedAction(payload) {
    return {
        type: VERSUS_FETCHED,
        payload
    };
}

export function versusErrorFetchAction(error) {
    return {
        type: VERSUS_ERROR_FETCH,
        error
    };
}

export function updateSelectedSeasonAction(payload) {
    return {
        type: UPDATE_SELECTED_SEASON,
        payload
    };
}
