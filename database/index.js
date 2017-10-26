const { Client } = require('pg');
const Promise = require('bluebird');
const yyyymmdd = require('yyyy-mm-dd');

const client = new Client({
  user: process.env.LENA_ORDERS_DB_USER || 'lena',
  host: process.env.LENA_ORDERS_DB_HOST || 'localhost',
  database: process.env.LENA_ORDERS_DB_DATA || 'transactions',
  port: process.env.LENA_ORDERS_DB_PORT || 5432,
});

client.connect();

const createOrder = (userId, shippingAddress) => {
  const queryStr = `
    INSERT INTO orders
    (user_id, shipping_address, delivery_status, created_at)
    VALUES
    ($1, $2, 'created', $3)
  `;
  const currDate = yyyymmdd(new Date());
  const queryArgs = [userId, shippingAddress, currDate];
  return client.query(queryStr, queryArgs);
};

const updateOrderStatus = (orderId, deliveryStatus, updatedAt) => {
  const queryStr = `
    UPDATE orders
    SET
    delivery_status = $2, updated_at = $3
    WHERE order_id = $1
  `;
  const queryArgs = [orderId, deliveryStatus, updatedAt];
  return client.query(queryStr, queryArgs);
};

// createOrder(2, 'work')
//   .then(result => console.log(result))
//   .catch(err => console.error(err));
//
// updateOrderStatus(3, 'completed', new Date().toISOString().slice(0, 10))
//   .then(result => console.log(result))
//   .catch(err => console.error(err));

module.exports = {
  createOrder,
  updateOrderStatus,
};
