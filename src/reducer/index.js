import { combineReducers } from 'redux';
import login from 'Containers/Login/reducer';
import register from 'Containers/Register/reducer';
import { connectRouter } from 'connected-react-router';
// import { history } from '../store/configureStore';

export default history =>
    combineReducers({
        login,
        register,
        router: connectRouter(history)
    });
