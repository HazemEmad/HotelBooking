import {ADD_BOOKING} from '../../constants/actions';

export const addBooking = data => ({
  type: ADD_BOOKING,
  payload: data,
});
