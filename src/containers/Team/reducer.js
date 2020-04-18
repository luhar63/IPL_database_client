import objectAssign from 'object-assign';
import {
    TEAM_DETAILS_FETCH,
    TEAM_DETAILS_FETCHING,
    TEAM_DETAILS_FETCHED,
    TEAM_DETAILS_ERROR_FETCH
} from './constant';

import initialState from '../../reducer/initialState';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function teamReducer(
    state = initialState.teamdetails,
    action
) {
    let newState;

    switch (action.type) {
        case TEAM_DETAILS_FETCH:
            // For this example, just simulating a save by changing date modified.
            // In a real app using Redux, you might use redux-thunk and handle the async call in fuelSavingsActions.js
            return objectAssign({}, state, {
                isFetching: false,
                error: null,
                data: null
            });
        case TEAM_DETAILS_FETCHING:
            return objectAssign({}, state, {
                isFetching: true,
                error: null,
                data: null
            });

        case TEAM_DETAILS_FETCHED:
            newState = objectAssign({}, state);
            newState.data = action.payload;
            newState.isFetching = false;
            return newState;

        case TEAM_DETAILS_ERROR_FETCH:
            newState = objectAssign({}, state);
            newState.error = action.payload;
            newState.isFetching = false;
            return newState;

        default:
            return state;
    }
}
