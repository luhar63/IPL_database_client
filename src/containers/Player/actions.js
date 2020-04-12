import {
    PLAYER_DETAILS_FETCH,
    PLAYER_DETAILS_FETCHING,
    PLAYER_DETAILS_FETCHED,
    PLAYER_DETAILS_ERROR_FETCH
} from './constant';

export function playerDetailsFetchAction() {
    return {
        type: PLAYER_DETAILS_FETCH
    };
}

export function playerDetailsFetchingAction() {
    return {
        type: PLAYER_DETAILS_FETCHING
    };
}

export function playerDetailsFetchedAction(payload) {
    return {
        type: PLAYER_DETAILS_FETCHED,
        payload
    };
}

export function playerDetailsErrorFetchAction(error) {
    return {
        type: PLAYER_DETAILS_ERROR_FETCH,
        error
    };
}
