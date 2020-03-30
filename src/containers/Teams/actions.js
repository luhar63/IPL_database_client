import {
    TEAMS_FETCH,
    TEAMS_FETCHING,
    TEAMS_FETCHED,
    TEAMS_ERROR_FETCH
} from './constant';

export function teamsFetchAction() {
    return {
        type: TEAMS_FETCH
    };
}

export function teamsFetchingAction() {
    return {
        type: TEAMS_FETCHING
    };
}

export function teamsFetchedAction(payload) {
    return {
        type: TEAMS_FETCHED,
        payload
    };
}

export function teamsErrorFetchAction(error) {
    return {
        type: TEAMS_ERROR_FETCH,
        error
    };
}

