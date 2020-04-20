import objectAssign from 'object-assign';
import { combineReducers } from 'redux';
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

import initialState from '../../reducer/initialState';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
function search(state = initialState.home.search, action) {
    let newState;

    switch (action.type) {
        case SEARCH_FETCH:
            // For this example, just simulating a save by changing date modified.
            // In a real app using Redux, you might use redux-thunk and handle the async call in fuelSavingsActions.js
            return objectAssign({}, state, {
                isLoading: false,
                error: null,
                data: null
            });
        case SEARCH_FETCHING:
            return objectAssign({}, state, {
                isLoading: true,
                error: null,
                data: null
            });

        case SEARCH_FETCHED:
            newState = objectAssign({}, state);
            newState.data = action.payload;
            newState.isLoading = false;
            return newState;

        case SEARCH_ERROR_FETCH:
            newState = objectAssign({}, state);
            newState.error = action.payload;
            newState.isLoading = false;
            return newState;

        default:
            return state;
    }
}

function tuples(state = initialState.home.tuples, action) {
    let newState;

    switch (action.type) {
        case TUPLES_FETCH:
            // For this example, just simulating a save by changing date modified.
            // In a real app using Redux, you might use redux-thunk and handle the async call in fuelSavingsActions.js
            return objectAssign({}, state, {
                isLoading: false,
                error: null,
                data: null
            });
        case TUPLES_FETCHING:
            return objectAssign({}, state, {
                isLoading: true,
                error: null,
                data: null
            });

        case TUPLES_FETCHED:
            newState = objectAssign({}, state);
            newState.data = action.payload;
            newState.isLoading = false;
            return newState;

        case TUPLES_ERROR_FETCH:
            newState = objectAssign({}, state);
            newState.error = action.payload;
            newState.isLoading = false;
            return newState;

        default:
            return state;
    }
}


export default combineReducers({
    search,
    tuples
});