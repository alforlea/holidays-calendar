import {
  GET_PROFILES_YEAR,
  NEW_PROFILE,
  DELETE_PROFILE
} from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case GET_PROFILES_YEAR:
      return action.payload;
    case NEW_PROFILE:
      return state.concat(action.payload);
    case DELETE_PROFILE:
      return state.filter(profile_name => profile_name != action.payload);
    default:
      return state;
  }
}
