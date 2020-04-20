import {
    SEARCH_FETCH,
    SEARCH_FETCHING,
    SEARCH_FETCHED,
    SEARCH_ERROR_FETCH,
    TUPLES_FETCH,
    TUPLES_FETCHING,
    TUPLES_FETCHED,
    TUPLES_ERROR_FETCH
} from './constant';

export function searchFetchAction() {
    return {
        type: SEARCH_FETCH
    };
}

export function searchFetchingAction() {
    return {
        type: SEARCH_FETCHING
    };
}

export function searchFetchedAction(payload) {
    return {
        type: SEARCH_FETCHED,
        payload
    };
}

export function searchErrorFetchAction(error) {
    return {
        type: SEARCH_ERROR_FETCH,
        error
    };
}


export function tuplesFetchAction() {
    return {
        type: TUPLES_FETCH
    };
}

export function tuplesFetchingAction() {
    return {
        type: TUPLES_FETCHING
    };
}

export function tuplesFetchedAction(payload) {
    return {
        type: TUPLES_FETCHED,
        payload
    };
}

export function tuplesErrorFetchAction(error) {
    return {
        type: TUPLES_ERROR_FETCH,
        error
    };
}