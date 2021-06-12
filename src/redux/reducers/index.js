import {combineReducers} from 'redux';
import auth from './auth';
import bookings from './bookings';
// Redux: Root Reducer
const rootReducer = combineReducers({auth: auth, bookings: bookings});

export default rootReducer;
