-- DROP DATABASE IF EXISTS transactions;
-- CREATE DATABASE transactions;

CREATE TABLE IF NOT EXISTS orders (
  order_id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  shipping_address VARCHAR(256) NOT NULL,
  delivery_status VARCHAR(40) NOT NULL,
  created_at DATE NOT NULL,
  updated_at DATE
);

CREATE TABLE IF NOT EXISTS products (
  order_id INTEGER NOT NULL REFERENCES orders(order_id),
  product_id INTEGER NOT NULL,
  amount INTEGER NOT NULL
);
