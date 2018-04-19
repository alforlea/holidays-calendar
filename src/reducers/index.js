import { combineReducers } from 'redux';
import YearSelectReducer from './yearSelectReducer';
import ProfilesYearReducer from './profilesYearReducer';
import HolidayCheckReducer from './holidayCheckReducer';
import OfficialCheckReducer from './officialCheckReducer';
import OfficialModeReducer from './officialModeReducer';

const rootReducer = combineReducers({
  year: YearSelectReducer,
  profiles: ProfilesYearReducer,
  profileData: HolidayCheckReducer,
  officialMode: OfficialModeReducer,
  officialData: OfficialCheckReducer
});

export default rootReducer;
