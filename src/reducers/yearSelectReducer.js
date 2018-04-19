import { YEAR_SELECTED } from '../actions/types';

export default function(state = new Date().getFullYear(), action) {
  switch (action.type) {
    case YEAR_SELECTED:
      return action.payload;
    default:
      return state;
  }
}
