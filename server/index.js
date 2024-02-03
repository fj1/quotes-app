// index.js is our server
const express = require('express');
const app = express();
const port = 3001 || process.env.port;
const quotesRouter = require('./routes/quotes');

// tell Express to allow JSON in the bodies of a request
app.use(express.json());

// set up an express route for route (`/`)
// this only returns a healthcheck ping to the app (in other words, an 'alive' message)
app.get('/', (req, res) => {
  res.json({ message: 'alive' });
});

// set up an express route for `/quotes`
// the quotesRouter file will handle this route
app.use('/quotes', quotesRouter);

// listen to the port and start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
