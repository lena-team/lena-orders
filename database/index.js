const pgp = require('pg-promise')();

const connection = {
  host: process.env.LENA_ORDERS_DB_HOST || 'localhost',
  port: process.env.LENA_ORDERS_DB_PORT || 5432,
  database: process.env.LENA_ORDERS_DB_DATA || 'transactions',
  user: process.env.LENA_ORDERS_DB_USER || 'lena',
  // password: process.env.LENA_ORDERS_DB_PASSWORD || '',
};

const db = pgp(connection);

/**
 * Will create an order in the `order` table
 * @param  {index} userId            an integer representing the idenitfying index of a user
 * @param  {address} shippingAddress an address that the products are to be shipped to
 * @param  {date} createdAt          date that the order was created on
 * @return {Promise}                 a promise hodling the result of the row insertion and
 *                                     order_id of inserted row
 */

const createOrder = (userId, shippingAddress, createdAt) => {
  const queryStr = `
    INSERT INTO orders
    (user_id, shipping_address, delivery_status, created_at)
    VALUES
    ($1, $2, 'created', $3)
    RETURNING order_id
  `;
  const queryArgs = [userId, shippingAddress, createdAt];
  return db.one(queryStr, queryArgs);
};

/**
 * Will update the status of an order with the date, and status ('cancelled' or 'delivered')
 * @param  {number} orderId        the index of the order in the `orders` table
 * @param  {string} deliveryStatus string indicating status of order ('cancelled' or 'devlivered')
 * @param  {date} updatedAt        date of update in YYYY-MM-DD format
 * @return {Promise}               A promise containing the results of the row update
 */

const updateOrderStatus = (orderId, deliveryStatus, updatedAt) => {
  const queryStr = `
    UPDATE orders
    SET
    delivery_status = $2, updated_at = $3
    WHERE order_id = $1
    RETURNING order_id
  `;
  const queryArgs = [orderId, deliveryStatus, updatedAt];
  return db.one(queryStr, queryArgs);
};

/**
 * A function that will assign products and their amounts to specific orders
 * @param {array} productArr    An array of objects of the form:
 *                                { order_id, product_id, amount }
 */

const addProductsToOrder = (productArr) => {
  const columns = ['order_id', 'product_id', 'amount'];
  const queryStr = pgp.helpers.insert(productArr, columns, 'products');
  return db.none(queryStr);
};

// createOrder(2, 'work', new Date())
//   .then(result => console.log(result))
//   .then(() => process.exit())
//   .catch(err => console.error(err));
//
// updateOrderStatus(11889894, 'completed', new Date().toISOString().slice(0, 10))
//   .then(result => console.log(result))
//   .then(() => process.exit())
//   .catch(err => console.error(err));

// const productArr = [
//   { order_id: 11869892, product_id: 10, amount: 4 },
//   { order_id: 11869892, product_id: 3, amount: 5 },
//   { order_id: 11869892, product_id: 234, amount: 7 },
// ];
//
// addProductsToOrder(productArr)
//   .then(result => console.log(result))
//   .then(() => process.exit())
//   .catch(err => console.error(err));

module.exports = {
  createOrder,
  updateOrderStatus,
  addProductsToOrder,
};
