import {
    STATS_FETCH,
    STATS_FETCHING,
    STATS_FETCHED,
    STATS_ERROR_FETCH
} from './constant';

export function statsFetchAction() {
    return {
        type: STATS_FETCH
    };
}

export function statsFetchingAction() {
    return {
        type: STATS_FETCHING
    };
}

export function statsFetchedAction(payload) {
    return {
        type: STATS_FETCHED,
        payload
    };
}

export function statsErrorFetchAction(error) {
    return {
        type: STATS_ERROR_FETCH,
        error
    };
}

