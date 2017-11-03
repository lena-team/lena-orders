const pgp = require('pg-promise');
const yyyymmdd = require('yyyy-mm-dd');

const connection = {
  host: process.env.LENA_ORDERS_DB_HOST || 'localhost',
  port: process.env.LENA_ORDERS_DB_PORT || 5432,
  database: process.env.LENA_ORDERS_DB_DATA || 'transactions',
  user: process.env.LENA_ORDERS_DB_USER || 'lena',
  password: process.evn.LENA_ORDERS_DB_PASSWORD || '',
};

const db = pgp(connection);

const createOrder = (userId, shippingAddress, createdAt) => {
  const queryStr = `
    INSERT INTO orders
    (user_id, shipping_address, delivery_status, created_at)
    VALUES
    ($1, $2, 'created', $3)
  `;
  const queryArgs = [userId, shippingAddress, createdAt];
  return db.none(queryStr, queryArgs);
};

const updateOrderStatus = (orderId, deliveryStatus, updatedAt) => {
  const queryStr = `
    UPDATE orders
    SET
    delivery_status = $2, updated_at = $3
    WHERE order_id = $1
  `;
  const queryArgs = [orderId, deliveryStatus, updatedAt];
  return db.none(queryStr, queryArgs);
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
