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
  const month = getRandomNumber(0, 12);
  const day = getRandomNumber(1, 28);
  return yyyymmdd(new Date(2017, month, day));
};

const addDays = (date, numDays) => {
  const newDate = new Date();
  newDate.setDate(date.getDate() + numDays);
  return newDate;
};

module.exports = {
  addDays,
  getRandomNumber,
  getRandomAddress,
  getRandomDate,
};
