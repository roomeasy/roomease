-- BASIC Schema
-- Not actual data model

-- Make sure Postgres.app is running
-- 'psql 'will enter the shell

-- If you run 'psql <database-name> < schema.sql' it will run the schema file and drop/create tables.
-- Only do this if you want to start fresh with the below schema.

-- \c <database-name> connects to database
-- \d <table-name> describes a certain table
-- \q to quit the shell

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS dwellings CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS task_instances CASCADE;

--Serial is used to auto-increment (75% sure on this...)
CREATE TABLE dwellings (
  id SERIAL PRIMARY KEY,
  address VARCHAR DEFAULT null,
  name VARCHAR unique
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  facebook_id BIGINT,
  facebook_token VARCHAR,
  username VARCHAR,
  age INTEGER DEFAULT null,
  email VARCHAR DEFAULT null,
  looking BOOLEAN DEFAULT FALSE,
  dwelling_id INTEGER references dwellings(id) -- foreign key
);

-- each task has 1 user
-- a user can have multiple tasks.
-- a dwelling has multiple tasks and multiple users
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  frequency INTEGER,
  start_date DATE,
  description VARCHAR DEFAULT NULL,
  user_id INTEGER DEFAULT NULL references users(id), -- foreign key
  dwelling_id INTEGER references dwellings(id) -- foreign key
);

CREATE TABLE task_instances (
  id SERIAL PRIMARY KEY,
  due_date DATE,
  completed BOOLEAN DEFAULT FALSE,
  task_id INTEGER references tasks(id)
);
