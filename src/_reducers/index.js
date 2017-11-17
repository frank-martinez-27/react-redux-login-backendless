import {combineReducers} from 'redux';

import { alert } from './alert.reducer';
import { registration } from './registration.reducer';
import { authentication } from './authentication.reducer';
import { users } from './users.reducer';

const rootReducer = combineReducers({
    alert,
    registration,
    authentication,
    users
});

export default rootReducer;