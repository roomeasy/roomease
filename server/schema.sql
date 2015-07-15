-- BASIC Schema
-- Not actual data model

-- Make sure Postgres.app is running
-- 'psql 'will enter the shell

-- If you run 'psql < schema.sql' it will run the schema file and drop/create tables.
-- Only do this if you want to start fresh with the below schema.

-- \c <database-name> connects to database
-- \d <table-name> describes a certain table
-- \q to quit the shell

DROP TABLE IF EXISTS users;

--Serial is used to auto-increment (75% sure on this...)
CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR, age INTEGER DEFAULT null);
