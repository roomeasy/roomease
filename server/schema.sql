-- BASIC Schema
-- Not actual data model

-- Make sure Postgres.app is running
-- 'psql 'will enter the shell

-- If you run 'psql < schema.sql' it will run the schema file and drop/create tables.
-- Only do this if you want to start fresh with the below schema.

-- \c <database-name> connects to database
-- \d <table-name> describes a certain table
-- \q to quit the shell

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS dwellings CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;

--Serial is used to auto-increment (75% sure on this...)
CREATE TABLE dwellings (
  id SERIAL PRIMARY KEY,
  address VARCHAR DEFAULT null,
  name VARCHAR unique
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR UNIQUE,
  password VARCHAR,
  age INTEGER DEFAULT null,
  email VARCHAR DEFAULT null,
  dwelling_id INTEGER references dwellings(id) -- foreign key
);

-- each task has 1 user
-- a user can have multiple tasks.
-- a dwelling has multiple tasks and multiple users
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  frequency INTEGER,
  created_at TIMESTAMP,
  description VARCHAR DEFAULT NULL,
  user_id INTEGER DEFAULT NULL references users(id), -- foreign key
  dwelling_id INTEGER references dwellings(id) -- foreign key
);

