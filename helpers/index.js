const yyyymmdd = require('yyyy-mm-dd');

const getRandomNumber = (start, end, fix = 0) => (
  ((Math.random() * (end - start)) + start).toFixed(fix) * 1
);

const getRandomAddress = () => {
  // const lon = getRandomNumber(-180, 180, 2);
  // const lat = getRandomNumber(-90, 90, 2);
  // return { lat, lon };
};

const getRandomDate = () => {
  const month = getRandomNumber(0, 11);
  const day = getRandomNumber(1, 28);
  return yyyymmdd(new Date(2017, month, day));
};

const addDays = (date, numDays) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays + 1);
  return yyyymmdd(newDate);
};

module.exports = {
  addDays,
  getRandomNumber,
  getRandomAddress,
  getRandomDate,
};
