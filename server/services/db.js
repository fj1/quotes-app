// this file is the entry point to the DB
// and it is the only file to communicate with the DB
const sqlite = require('better-sqlite3');
const path = require('path');
const config = require('../config');

const db = new sqlite(path.resolve('quotes.db'), { fileMustExist: true });

function getTotalNumOfPages() {
  const result = db.prepare('SELECT COUNT(*) AS count FROM quote').all();
  const totalNumOfRows = result[0].count;

  return Math.ceil(totalNumOfRows / config.listPerPage);
}

function query(sql, params) {
  // .prepare() creates a "prepared statement", which is pre-compiled SQL code
  // .all() returns all the rows
  // with the offset + limit, .all() will return no more than 10 rows
  return db.prepare(sql).all(params);
}

function run(sql, params) {
  return db.prepare(sql).run(params);
}

module.exports = { getTotalNumOfPages, run, query };
