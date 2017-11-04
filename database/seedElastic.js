const elasticsearch = require('elasticsearch');
const yyyymmdd = require('yyyy-mm-dd');
const { getRandomNumber, randomAddress, addDays } = require('../helpers');

const client = new elasticsearch.Client({
  host: 'localhost:9200',
});

const generateFakeOrders = (start = 0, end = 10000000) => {
  const entries = [];
  for (let i = start; i < end; i += 1) {
    const userId = getRandomNumber(1000, 1000000);
    const shippingAddress = randomAddress();
    const month = getRandomNumber(0, 12);
    const day = getRandomNumber(1, 28);
    const createdAt = yyyymmdd(new Date(2017, month, day));
    const daysUntilUpdate = getRandomNumber(0, 20);
    const updatedAt = addDays(new Date(createdAt), daysUntilUpdate);
    const cancelled = Math.random() < (0.2 + (daysUntilUpdate * 0.02));
    const deliveryStatus = cancelled ? 'cancelled' : 'delivered';
    const productArr = [];
    const numProducts = getRandomNumber(1, 10);
    for (let j = 0; j < numProducts; j += 1) {
      const product = {};
      product.amount = getRandomNumber(1, 100);
      product.product_id = getRandomNumber(1000, 100000000);
      productArr.push(product);
    }
    entries.push({
      index: { _index: 'transactions', _type: 'order' },
      mappings: {
        order: {
          properties: {
            shippingAddress: {
              type: 'geo_point',
            },
          },
        },
      },
    });
    entries.push({
      userId,
      createdAt,
      updatedAt,
      deliveryStatus,
      shippingAddress,
      productArr,
    });
  }
  client.bulk({
    body: entries,
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
