import {ADD_BOOKING, REMOVE_BOOKINGS} from '../../constants/actions';

const INITIAL_STATE = {
  bookings: [],
};

export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case ADD_BOOKING:
      return {
        ...state,
        bookings: payload,
      };
    default:
      return state;
  }
};
