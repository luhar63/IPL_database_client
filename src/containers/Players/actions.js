import {
    PLAYERS_FETCH,
    PLAYERS_FETCHING,
    PLAYERS_FETCHED,
    PLAYERS_ERROR_FETCH
} from './constant';

export function playersFetchAction() {
    return {
        type: PLAYERS_FETCH
    };
}

export function playersFetchingAction() {
    return {
        type: PLAYERS_FETCHING
    };
}

export function playersFetchedAction(payload) {
    return {
        type: PLAYERS_FETCHED,
        payload
    };
}

export function playersErrorFetchAction(error) {
    return {
        type: PLAYERS_ERROR_FETCH,
        error
    };
}

