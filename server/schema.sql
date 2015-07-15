-- BASIC Schema
-- Not actual data model

-- Make sure Postgres.app is running
-- Type psql to get into command line shell
-- tinker with db
-- Only run schema when you want to start over

-- \c <database-name> connects to database
-- \d <table-name> describes a certain table
-- \q to quit the shell

DROP TABLE IF EXISTS users;

--Serial is used to auto-increment (75% sure on this...)
CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR, age INTEGER DEFAULT null);
