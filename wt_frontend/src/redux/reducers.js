import { combineReducers } from 'redux';
import token from './token/reducer';
import user from './user/reducer';
import chat from './chat/reducer';
import friends from './friends/reducer';
import reduxExample from './reduxExample/reducer';

export default combineReducers({
    reduxExample,
    friends,
    token,
    user,
    chat,
});
