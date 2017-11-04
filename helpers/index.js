const randomProfile = require('random-profile-generator');

const getRandomNumber = (start, end) => (
  Math.floor((Math.random() * (end - start)) + start)
);

const randomAddress = () => {
  const { zip, state } = randomProfile.profile();
  return `${state} ${zip}`;
};

const addDays = (date, numDays) => {
  const newDate = new Date();
  newDate.setDate(date.getDate() + numDays);
  return newDate;
};

module.exports = {
  addDays,
  getRandomNumber,
  randomAddress,
};
