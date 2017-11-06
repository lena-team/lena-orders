/* eslint-env mocha */
const { expect } = require('chai');
const { getRandomNumber, getRandomDate, addDays } = require('../helpers');

describe('Helper Functions', () => {
  describe('General helpers', () => {
    describe('getRandomNumber', () => {
      it('Should return 0, when 0 is passed in for first two parameters', () => {
        expect(getRandomNumber(0, 0)).to.equal(0);
      });
      it('Should return an integer, when not passed in a third parameter', () => {
        const randomNum = getRandomNumber(0, 10);
        expect(randomNum).to.be.a('number');
        expect(randomNum % 1).to.equal(0);
      });
      it('Should return a float with decimal expansion determined by third param', () => {
        const randomNum = getRandomNumber(0, 10, 3);
        expect((randomNum * 100) % 1).to.not.equal(0);
        expect((randomNum * 1000) % 1).to.equal(0);
      });
      it('Should work for negative inputs', () => {
        let randomNum;
        for (let i = 0; i < 1000; i += 1) {
          randomNum = getRandomNumber(-10, 10);
          expect(randomNum >= -10).to.equal(true);
          expect(randomNum <= 10).to.equal(true);
        }
      });
    });
    describe('getRandomDate', () => {
      it('Should return a date in YYYY-MM-DD format', () => {
        expect(getRandomDate().split('-').length).to.equal(3);
        expect(getRandomDate().length).to.equal('YYYY-MM-DD'.length);
      });
      it('Should be in the year of 2017', () => {
        let year;
        for (let i = 0; i < 1000; i += 1) {
          [year] = getRandomDate().split('-');
          expect(year).to.equal('2017');
        }
      });
    });
  });
});
