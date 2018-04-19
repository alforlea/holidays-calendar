import {
  LOADED_HOLIDAYS,
  ADD_HOLIDAY,
  DELETE_HOLIDAY,
  ADD_MOSCOSO,
  ADD_OTRO,
  DELETE_PREVIOUS
} from '../actions/types';
import DEFAULT_STATE from '../templates/defaultState';

export default function(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case LOADED_HOLIDAYS:
      return action.payload;
    case ADD_HOLIDAY:
      return {
        ...state,
        [action.payload]: 'vacacion-pedida',
        usedHolidays: state.usedHolidays + 1
      };
    case ADD_MOSCOSO:
      return {
        ...state,
        [action.payload]: 'moscoso-pedido',
        usedHolidays: state.usedHolidays - 1,
        usedMoscosos: state.usedMoscosos + 1
      };
    case ADD_OTRO:
      return {
        ...state,
        [action.payload]: 'otro-permiso',
        usedMoscosos: state.usedMoscosos - 1,
        permisosAdicionales: state.permisosAdicionales + 1
      };
    case DELETE_HOLIDAY:
      return {
        ...state,
        [action.payload]: 'laboral',
        permisosAdicionales: state.permisosAdicionales - 1
      };
    case DELETE_PREVIOUS:
      if (action.payload.mode == 1) {
        return {
          ...state,
          [action.payload.day]: 'laboral',
          usedHolidays: state.usedHolidays - 1
        };
      } else if (action.payload.mode == 2) {
        return {
          ...state,
          [action.payload.day]: 'laboral',
          usedMoscosos: state.usedMoscosos - 1
        };
      } else if (action.payload.mode == 3) {
        return {
          ...state,
          [action.payload.day]: 'laboral',
          permisosAdicionales: state.permisosAdicionales - 1
        };
      }

    default:
      return state;
  }
}

//Funcionalidades: colores segun moscoso, vacaciones, merjar oficiales con findes
