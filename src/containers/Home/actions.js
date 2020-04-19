import {
    SEARCH_FETCH,
    SEARCH_FETCHING,
    SEARCH_FETCHED,
    SEARCH_ERROR_FETCH
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
