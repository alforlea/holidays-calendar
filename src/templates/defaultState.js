let date = new Date();
const year = date.getFullYear();
date = new Date(year, 0, 1);
let days = [];
while (date.getFullYear() == year || date.getMonth() < 3) {
  days.push(new Date(date).getTime());
  date.setDate(date.getDate() + 1);
}

let DEFAULT_STATE = {};
days.map(day => {
  DEFAULT_STATE[day] = 'laboral';
  return;
});
DEFAULT_STATE.name = 'Nombre de usuario';
DEFAULT_STATE.year = year;
DEFAULT_STATE.totalHolidays = 24;
DEFAULT_STATE.usedHolidays = 0;
DEFAULT_STATE.totalMoscosos = 6;
DEFAULT_STATE.usedMoscosos = 0;
DEFAULT_STATE.permisosAdicionales = 0;
DEFAULT_STATE.weekHolidays = [0, 0, 0, 0, 0, 0, 0];

export default DEFAULT_STATE;
