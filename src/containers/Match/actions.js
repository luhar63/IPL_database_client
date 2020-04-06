import {
    MATCH_DETAILS_FETCH,
    MATCH_DETAILS_FETCHING,
    MATCH_DETAILS_FETCHED,
    MATCH_DETAILS_ERROR_FETCH
} from './constant';

export function matchDetailsFetchAction() {
    return {
        type: MATCH_DETAILS_FETCH
    };
}

export function matchDetailsFetchingAction() {
    return {
        type: MATCH_DETAILS_FETCHING
    };
}

export function matchDetailsFetchedAction(payload) {
    return {
        type: MATCH_DETAILS_FETCHED,
        payload
    };
}

export function matchDetailsErrorFetchAction(error) {
    return {
        type: MATCH_DETAILS_ERROR_FETCH,
        error
    };
}
