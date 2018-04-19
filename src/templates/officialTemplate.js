let date = new Date();
const year = date.getFullYear();
date = new Date(year, 0, 1);
let days = [];
while (date.getFullYear() == year || date.getMonth() < 3) {
  days.push(new Date(date).getTime());
  date.setDate(date.getDate() + 1);
}

let OFFICIAL_DEFAULT_STATE = {};
days.map(day => {
  OFFICIAL_DEFAULT_STATE[day] = 'laboral';
  return;
});

export default OFFICIAL_DEFAULT_STATE;
