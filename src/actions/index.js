const { ipcRenderer } = window.require('electron');
import OFFICIAL_STATE from '../templates/officialTemplate';

import holidaysTemplate from '../templates/holidaysTemplate';
import {
  LOADED_HOLIDAYS, //
  ADD_HOLIDAY, //
  ADD_MOSCOSO, //
  ADD_OTRO, //
  DELETE_HOLIDAY, //
  DELETE_PREVIOUS, //
  OFFICIAL_MODE,
  LOAD_OFFICIAL,
  ADD_OFFICIAL, //
  DELETE_OFFICIAL, //
  YEAR_SELECTED, //deprecated
  NEW_PROFILE, //
  DELETE_PROFILE, //
  GET_PROFILES_YEAR //
} from './types';

export function selectedYear(year) {
  //Will be eliminated
  return {
    type: YEAR_SELECTED,
    payload: year
  };
}

///// Actions for create, edit globals and delete a profile /////
export function createProfile(name, year, holidays, moscosos, weekHolidays) {
  let HOLIDAYS_STATE = holidaysTemplate(
    name,
    year,
    holidays,
    moscosos,
    weekHolidays
  );
  ipcRenderer.send('create_or_save_user_holidays', HOLIDAYS_STATE);
  return { type: 'NEW_PROFILE', payload: name };
}

export function editProfile(holidays, moscosos, weekHolidays, HOLIDAYS_STATE) {
  HOLIDAYS_STATE.totalHolidays = holidays;
  HOLIDAYS_STATE.totalMoscosos = moscosos;
  HOLIDAYS_STATE.weekHolidays = weekHolidays;
  ipcRenderer.send('create_or_save_user_holidays', HOLIDAYS_STATE);
  return { type: 'DO_NOTHING', payload: '' };
}

export function deleteProfile(name, year) {
  const state = { name, year };
  ipcRenderer.send('ask_delete_user', state);
  return { type: 'DELETE_PROFILE', payload: name };
}

///// Actions for load and save the data of a profile
export function saveUserData(holidays) {
  ipcRenderer.send('create_or_save_user_holidays', holidays);
  return { type: 'DO_NOTHING', payload: [] };
}

export const loadUserData = (profile, year) => dispatch => {
  const key = profile.replace(/\s/g, '');
  const completeKey = String(year)
    .concat('.')
    .concat(key);
  ipcRenderer.send('ask_user_holidays', completeKey);
  ipcRenderer.once('load_user_holidays', (event, userHolidays) => {
    dispatch({ type: LOADED_HOLIDAYS, payload: userHolidays });
  });
};

///// Action go get the profile keys of a year /////
export const getProfilesByYear = year => dispatch => {
  var profiles;
  ipcRenderer.send('ask_profiles_year', year);
  ipcRenderer.once('load_profiles_year', (event, loadedData) => {
    console.log(loadedData);
    if (loadedData == null || loadedData == undefined) {
      profiles = [];
    } else {
      profiles = loadedData;
    }
    dispatch({ type: GET_PROFILES_YEAR, payload: profiles });
  });
};

///// Actions for select holidays in Day component /////
export function manageHolidays(previous, day) {
  switch (previous) {
    case 'laboral':
      return {
        type: ADD_HOLIDAY,
        payload: day
      };
    case 'vacacion-pedida':
      return {
        type: ADD_MOSCOSO,
        payload: day
      };
    case 'moscoso-pedido':
      return {
        type: ADD_OTRO,
        payload: day
      };
    default:
      return {
        type: DELETE_HOLIDAY,
        payload: day
      };
  }
}

export function deletePrevious(day, mode) {
  return {
    type: DELETE_PREVIOUS,
    payload: { day: day, mode: mode }
  };
}

///// For Day component, official mode, load, add and delete /////
export function setOfficialMode(officialMode) {
  return {
    type: OFFICIAL_MODE,
    payload: officialMode
  };
}

export const loadOfficialDays = year => dispatch => {
  const completeKey = String(year).concat('.officialHolidays');
  let officialHolidays;
  ipcRenderer.send('ask_official_holidays', completeKey);
  ipcRenderer.once('load_official_holidays', (event, holidays) => {
    if (holidays == null || holidays == undefined) {
      officialHolidays = OFFICIAL_STATE;
    } else {
      officialHolidays = holidays;
    }
    dispatch({ type: LOAD_OFFICIAL, payload: officialHolidays });
  });
};

export function addOfficial(day) {
  const dayKey = day.getTime();
  console.log(dayKey);
  const year = day.getFullYear();
  let state = { day: dayKey, year: year, add: true };
  ipcRenderer.send('save_official_holidays', state);
  return {
    type: ADD_OFFICIAL,
    payload: dayKey
  };
}

export function deleteOfficial(day) {
  const dayKey = day.getTime();
  const year = day.getFullYear();
  let state = { day: dayKey, year: year, add: false };
  ipcRenderer.send('save_official_holidays', state);
  return {
    type: DELETE_OFFICIAL,
    payload: dayKey
  };
}
