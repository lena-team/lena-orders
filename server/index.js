const express = require('express');
const bodyParser = require('body-parser');

// constants
const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(bodyParser.json());

// Start the server
app.listen((port, () => {
  console.log(`Listening on port: ${port}!`);
}));
