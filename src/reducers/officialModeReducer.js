import { OFFICIAL_MODE } from '../actions/types';

export default function(state = false, action) {
  switch (action.type) {
    case OFFICIAL_MODE:
      return action.payload;
    default:
      return state;
  }
}
