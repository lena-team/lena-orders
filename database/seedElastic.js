const axios = require('axios');
const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace',
});

// Helper Functions

const getRandomNumber = (start, end) => (
  Math.floor((Math.random() * (end - start)) + start)
);

const addresses = ['work', 'home', 'school'];

const addDays = (date, days) => {
  date.setDate(date.getDate() + days);
  return date;
};

// Function that generates the data

const generateFakeOrders = async (start = 0, end = 10000000) => {
  const entries = [];
  for (let i = start; i < end; i += 1) {
    const userId = getRandomNumber(1000, 1000000);
    const adressId = getRandomNumber(0, addresses.length);
    const shippingAddress = addresses[adressId];
    let month = getRandomNumber(1, 13);
    if (month < 10) {
      month = `0${month}`;
    }
    let day = getRandomNumber(1, 28);
    if (day < 10) {
      day = `0${day}`;
    }
    const createdAt = new Date(`2017-${month}-${day}`);
    const daysUntilUpdate = getRandomNumber(0, 20);
    const updatedAt = addDays(new Date(createdAt), daysUntilUpdate);
    const cancelled = Math.random() < (0.2 + (daysUntilUpdate * 0.02));
    const deliveryStatus = cancelled ? 'cancelled' : 'delivered';
    entries.push({ index: { _index: 'transactions', _type: 'order' } });
    entries.push({
      userId,
      createdAt,
      updatedAt,
      deliveryStatus,
      shippingAddress,
      deliveryTime: Math.round((updatedAt.getTime() - createdAt.getTime()) / (24 * 60 * 60 * 1000)),
    });
  }
  client.bulk({
    body: entries
  }, (err, resp) => {
    if (err) { console.error(err); }
    return resp;
  });
};

generateFakeOrders(0, 10000);

// for ten million entries
//   choose a random integer for the unser_id
//   choose a random shipping_address
//   choose a random created_at date over the last 3 months
//   insert this data into the DATABASE
//   once this has completed, then
//     choose a random date 0 - 20 days after the created_at date
//     randomly choose whether the order was completed or cancelled
//     (i.e. if ( Math.random() < 0.2 + 0.02 * (updated_at - created_at) ))
