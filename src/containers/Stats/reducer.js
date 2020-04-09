import objectAssign from 'object-assign';
import { combineReducers } from 'redux';
import {
    STATS_FETCH,
    STATS_FETCHING,
    STATS_FETCHED,
    STATS_ERROR_FETCH,
    STATS_FILTER_FETCH,
    STATS_FILTER_FETCHING,
    STATS_FILTER_FETCHED,
    STATS_FILTER_ERROR_FETCH,
    STATS_SET_ACTIVE_FILTER,
    STATS_SET_SEASON
} from './constant';

import initialState from '../../reducer/initialState';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.

function statsDetail(state = initialState.stats.statsDetail, action) {
    let newState;

    switch (action.type) {
        case STATS_FETCH:
            // For this example, just simulating a save by changing date modified.
            // In a real app using Redux, you might use redux-thunk and handle the async call in fuelSavingsActions.js

            return objectAssign({}, state, {
                isFetching: false,
                error: null,
                data: null
            });
        case STATS_FETCHING:
            return objectAssign({}, state, {
                isFetching: true,
                error: null,
                data: null
            });

        case STATS_FETCHED:
            newState = objectAssign({}, state);
            newState.data = action.payload;
            newState.isFetching = false;
            return newState;

        case STATS_ERROR_FETCH:
            newState = objectAssign({}, state);
            newState.error = action.error;
            newState.isFetching = false;
            return newState;

        default:
            return state;
    }
}
function statsFilters(state = initialState.stats.statsFilters, action) {
    let newState;

    switch (action.type) {
        case STATS_FILTER_FETCH:
            // For this example, just simulating a save by changing date modified.
            // In a real app using Redux, you might use redux-thunk and handle the async call in fuelSavingsActions.js
            return objectAssign({}, state, {
                isFetching: false,
                error: null,
                data: null
            });
        case STATS_FILTER_FETCHING:
            return objectAssign({}, state, {
                isFetching: true,
                error: null,
                data: null
            });

        case STATS_FILTER_FETCHED:
            newState = objectAssign({}, state);
            newState.data = action.payload;
            newState.isFetching = false;
            return newState;

        case STATS_FILTER_ERROR_FETCH:
            newState = objectAssign({}, state);
            newState.error = action.error;
            newState.isFetching = false;
            return newState;

        default:
            return state;
    }
}

function statsMisc(state = initialState.stats.statsMisc, action) {
    let newState;

    switch (action.type) {
        case STATS_SET_ACTIVE_FILTER:
            // For this example, just simulating a save by changing date modified.
            // In a real app using Redux, you might use redux-thunk and handle the async call in fuelSavingsActions.js

            newState = objectAssign({}, state);
            newState.activeFilter = action.payload;
            return newState;
        case STATS_SET_SEASON:
            newState = objectAssign({}, state);
            newState.selectedSeason = action.payload;
            return newState;

        default:
            return state;
    }
}

export default combineReducers({
    statsDetail,
    statsFilters,
    statsMisc
});
