export default function holidaysTemplate(
  name,
  year,
  holidays,
  moscosos,
  weekHolidays
) {
  let date = new Date(year, 0, 1);
  let days = [];
  while (date.getFullYear() == year || date.getMonth() < 3) {
    days.push(new Date(date).getTime());
    date.setDate(date.getDate() + 1);
  }

  let HOLIDAYS_STATE = {};
  days.map((day, index) => {
    HOLIDAYS_STATE[day] = 'laboral';
    return;
  });
  HOLIDAYS_STATE.name = name;
  HOLIDAYS_STATE.year = year;
  HOLIDAYS_STATE.totalHolidays = holidays;
  HOLIDAYS_STATE.usedHolidays = 0;
  HOLIDAYS_STATE.totalMoscosos = moscosos;
  HOLIDAYS_STATE.usedMoscosos = 0;
  HOLIDAYS_STATE.permisosAdicionales = 0;
  HOLIDAYS_STATE.weekHolidays = weekHolidays;

  return HOLIDAYS_STATE;
}

