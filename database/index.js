const { Client } = require('pg');
const Promise = require('bluebird');

const client = new Client({
  user: process.env.LENA_ORDERS_DB_USER || 'lena',
  host: process.env.LENA_ORDERS_DB_HOST || 'localhost',
  database: process.env.LENA_ORDERS_DB_data || 'transactions',
  port: process.env.LENA_ORDERS_DB_PORT || 5432,
});

client.connect();

const createOrder = (userId, shippingAddress, createdAt) => {
  const queryStr = `
    INSERT INTO orders
    (user_id, shipping_address, delivery_status, created_at)
    VALUES
    ($1, $2, 'created', $3)
    RETURNING order_id
  `;
  const queryArgs = [userId, shippingAddress, createdAt];
  return new Promise((resolve, reject) => {
    client.query(queryStr, queryArgs, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

const updateOrderStatus = (orderId, deliveryStatus, updatedAt) => {
  const queryStr = `
    UPDATE orders
    SET
    delivery_status = $2, updated_at = $3
    WHERE order_id = $1
  `;
  const queryArgs = [orderId, deliveryStatus, updatedAt];
  return new Promise((resolve, reject) => {
    client.query(queryStr, queryArgs, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

// createOrder(2, 'work')
//   .then(result => console.log(result.rows[0].order_id))
//   .catch(err => console.error(err));

// updateOrderStatus(3, 'completed', new Date().toISOString().slice(0, 10))
//   .then(result => console.log(result))
//   .catch(err => console.error(err));

module.exports = {
  createOrder,
  updateOrderStatus,
};
