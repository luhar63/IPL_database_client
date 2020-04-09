import {
    STATS_FETCH,
    STATS_FETCHING,
    STATS_FETCHED,
    STATS_ERROR_FETCH,
    STATS_FILTER_FETCH,
    STATS_FILTER_FETCHING,
    STATS_FILTER_FETCHED,
    STATS_FILTER_ERROR_FETCH,
    STATS_SET_SEASON,
    STATS_SET_ACTIVE_FILTER
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

export function statsFilterFetchAction() {
    return {
        type: STATS_FILTER_FETCH
    };
}

export function statsFilterFetchingAction() {
    return {
        type: STATS_FILTER_FETCHING
    };
}

export function statsFilterFetchedAction(payload) {
    return {
        type: STATS_FILTER_FETCHED,
        payload
    };
}

export function statsFilterErrorFetchAction(error) {
    return {
        type: STATS_FILTER_ERROR_FETCH,
        error
    };
}

export function setActiveFilterAction(type, filter) {
    return {
        type: STATS_SET_ACTIVE_FILTER,
        payload: {
            type,
            filter
        }
    };
}

export function setSelectedSeasonAction(payload) {
    return {
        type: STATS_SET_SEASON,
        payload
    };
}
