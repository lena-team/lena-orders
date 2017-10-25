const knex = require('knex')({
  client: 'pg',
  connection: {
    user: process.env.LENA_ORDERS_DB_USER || 'lena',
    host: process.env.LENA_ORDERS_DB_HOST || 'localhost',
    password: process.env.LENA_ORDERS_DB_PASS,
    database: process.env.LENA_ORDERS_DB_data || 'transactions',
    port: process.env.LENA_ORDERS_DB_PORT || 5432,
  },
});

const bookshelf = require('bookshelf')(knex);

const Order = bookshelf.Model.extend({
  tableName: 'orders',
});

Order.fetchAll()
  .then((response) => {
    const { models } = response;
    models.forEach(model => console.log(model));
  })
  .catch((err) => {
    console.error('ERROR', err);
  });
