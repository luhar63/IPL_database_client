import {
    LOGIN_FETCH,
    LOGIN_FETCHING,
    LOGIN_FETCHED,
    LOGIN_ERROR_FETCH
} from './constant';

export function loginFetchAction() {
    return {
        type: LOGIN_FETCH
    };
}

export function loginFetchingAction() {
    return {
        type: LOGIN_FETCHING
    };
}

export function loginFetchedAction(payload) {
    return {
        type: LOGIN_FETCHED,
        payload
    };
}

export function loginErrorFetchAction(error) {
    return {
        type: LOGIN_ERROR_FETCH,
        error
    };
}
