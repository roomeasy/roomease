var pg = require('pg');
//var auth = process.env.DATABASE_URL ? null : require('../config/auth.js')

//This sets up you connection to the database. if on heroku, it links to the postgres database URL they give us.
//Otherwise it goes to out auth file and pulls it from there. if you leave the inside of the parens on line 6
//blank, you can set the database to a local instance of postgres on your machine. This is great for testing new
//features because you aren't affecting the production data.
//var db = new pg.Client(process.env.DATABASE_URL || auth.pgData);
var db = new pg.Client();
db.connect();

exports.db = db;
