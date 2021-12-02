import { combineReducers } from 'redux';
import token from './token/reducer';
import reduxExample from './reduxExample/reducer';
export default combineReducers({
    reduxExample,
    token,
});
