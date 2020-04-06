import { combineReducers } from 'redux';
import home from 'Containers/Home/reducer';
import teams from 'Containers/Teams/reducer';
import matches from 'Containers/Matches/reducer';
import stats from 'Containers/Stats/reducer';
import matchdetails from 'Containers/Match/reducer';
import { connectRouter } from 'connected-react-router';
import season from './season';
// import { history } from '../store/configureStore';

export default history =>
    combineReducers({
        home,
        teams,
        season,
        matches,
        stats,
        matchdetails,
        router: connectRouter(history)
    });
