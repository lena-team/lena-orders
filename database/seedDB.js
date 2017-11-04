const Promise = require('bluebird');
const yyyymmdd = require('yyyy-mm-dd');
const randomProfile = require('random-profile-generator');
const { createOrder, updateOrderStatus, addProductsToOrder } = require('./index');

// Helper Functions

const getRandomNumber = (start, end) => (
  Math.floor((Math.random() * (end - start)) + start)
);

const randomAddress = () => {
  const { zip, state } = randomProfile.profile();
  return `${state} ${zip}`;
};

const addDays = (date, days) => {
  date.setDate(date.getDate() + days);
  return date;
};

// Function that generates the data

const generateFakeOrders = async (start = 0, end = 10000000) => {
  const promises = [];
  for (let i = start; i < end; i += 1) {
    const userId = getRandomNumber(1000, 1000000);
    const shippingAddress = randomAddress();
    const month = getRandomNumber(0, 12);
    const day = getRandomNumber(1, 28);
    const createdAt = yyyymmdd(new Date(2017, month, day));
    promises.push(createOrder(userId, shippingAddress, createdAt)
      .then(response => response.order_id)
      .then((orderId) => {
        const daysUntilUpdate = getRandomNumber(0, 20);
        const updatedAt = addDays(new Date(createdAt), daysUntilUpdate);
        const cancelled = Math.random() < (0.2 + (daysUntilUpdate * 0.02));
        const deliveryStatus = cancelled ? 'cancelled' : 'delivered';
        return updateOrderStatus(orderId, deliveryStatus, updatedAt);
      })
      .then(response => response.order_id)
      .then((orderId) => {
        const productArr = [];
        const numProducts = getRandomNumber(1, 10);
        for (let j = 0; j < numProducts; j += 1) {
          const product = { order_id: orderId };
          product.amount = getRandomNumber(1, 100);
          product.product_id = getRandomNumber(1000, 100000000);
          productArr.push(product);
        }
        return addProductsToOrder(productArr);
      })
      .catch(err => console.error(err)));
  }
  Promise.all(promises)
    .then(() => {
      process.exit();
    });
};

generateFakeOrders(0, 20000);

// for ten million entries
//   choose a random integer for the unser_id
//   choose a random shipping_address
//   choose a random created_at date over the last 3 months
//   insert this data into the DATABASE
//   once this has completed, then
//     choose a random date 0 - 20 days after the created_at date
//     randomly choose whether the order was completed or cancelled
//     (i.e. if ( Math.random() < 0.2 + 0.02 * (updated_at - created_at) ))
