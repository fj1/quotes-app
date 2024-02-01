const express = require('express');
// create a new express router
const router = express.Router();
const quotes = require('../services/quotes');

// handle GETs on the `/` route
router.get('/', function (req, res, next) {
  try {
    res.json(quotes.getMultiple(req.query.page));
  } catch (error) {
    console.error('Error while getting quotes: ', error.message);
    // call the 'next' middleware
    next(error);
  }
});

// handle POST requests
router.post('/', function (req, res, next) {
  try {
    // call .create()
    // and then send the response back as JSON
    res.json(quotes.create(req.body));
  } catch (err) {
    console.error(`Error while adding quotes `, err.message);
    // call the 'next' middleware
    next(err);
  }
});

// handle PUT requests
router.put('/:id', function (req, res, next) {
  try {
    res.json(quotes.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating a quote `, err.message);
    next(err);
  }
});

module.exports = router;
