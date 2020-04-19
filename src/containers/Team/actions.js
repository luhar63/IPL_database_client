import {
    TEAM_DETAILS_FETCH,
    TEAM_DETAILS_FETCHING,
    TEAM_DETAILS_FETCHED,
    TEAM_DETAILS_ERROR_FETCH
} from './constant';

export function teamDetailsFetchAction() {
    return {
        type: TEAM_DETAILS_FETCH
    };
}

export function teamDetailsFetchingAction() {
    return {
        type: TEAM_DETAILS_FETCHING
    };
}

export function teamDetailsFetchedAction(payload) {
    return {
        type: TEAM_DETAILS_FETCHED,
        payload
    };
}

export function teamDetailsErrorFetchAction(error) {
    return {
        type: TEAM_DETAILS_ERROR_FETCH,
        error
    };
}
