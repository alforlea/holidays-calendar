import { LOAD_OFFICIAL, ADD_OFFICIAL, DELETE_OFFICIAL } from '../actions/types';
import OFFICIAL_STATE from '../templates/officialTemplate';

export default function(state = OFFICIAL_STATE, action) {
  switch (action.type) {
    case LOAD_OFFICIAL:
      return action.payload;
    case ADD_OFFICIAL:
      return {
        ...state,
        [action.payload]: 'vacacion-oficial'
      };
    case DELETE_OFFICIAL:
      return {
        ...state,
        [action.payload]: 'laboral'
      };
    default:
      return state;
  }
}
