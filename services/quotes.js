// quotes service
const db = require('./db.js');
const config = require('../config');

function getMultiple(page = 1) {
  // the limit + offset together allow for pagination
  const offset = (page - 1) * config.listPerPage;
  const data = db.query(`SELECT * FROM quote LIMIT ?,?`, [
    offset,
    config.listPerPage,
  ]);
  const meta = { page };

  return {
    data,
    meta,
  };
}

function validateIncomingQuoteObj(quote) {
  let messages = [];

  console.log(quote);

  if (!quote) {
    messages.push('No object is provided');
  }

  if (!quote.quote) {
    messages.push('Quote is empty');
  }

  if (!quote.author) {
    messages.push('Author is empty');
  }

  if (messages.length) {
    let error = new Error(messages.join());
    error.statusCode = 400;

    throw error;
  }
}

function create(quoteObj) {
  validateIncomingQuoteObj(quoteObj);

  // if validation passed, run the insert query
  const { quote, author } = quoteObj;
  const result = db.run(
    'INSERT INTO quote (quote, author) VALUES (@quote, @author)',
    { quote, author }
  );

  let message = 'Error in creating quote';
  if (result.changes) {
    message = 'Quote created successfully';
  }

  return { message };
}

function update(id, quoteObj) {
  validateIncomingQuoteObj(quoteObj);

  const { quote, author } = quoteObj;

  // COALESCE function keeps the current value if there is no new value (null)
  // we shouldn't need COALESCE because of our validation but we might iterate on updating a quote later
  // for example, adding a UI where the user can update a single field
  const result = db.run(
    'UPDATE quote SET quote=@quote, author=@author WHERE id=@id',
    { id, quote, author }
  );

  let message = 'Error in updating quote';
  if (result.changes) {
    message = 'Quote updated successfully';
  }

  return { message };
}

function deleteQuote(id) {
  const result = db.run('DELETE FROM quote WHERE id=@id', { id });

  let message = 'Error in deleting quote';
  if (result.changes) {
    message = 'Quote deleted successfully';
  }

  return { message };
}

module.exports = { create, deleteQuote, getMultiple, update };
