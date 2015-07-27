var pg = require('pg');
var keys = process.env.DATABASE_URL ? null : require('./config/auth.js')

var db = new pg.Client(process.env.DATABASE_URL || keys.pgData);
db.connect();

exports.db = db;
