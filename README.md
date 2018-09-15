# DocNest
[![CircleCI](https://circleci.com/gh/tinker-hub/docnest-server.svg?style=svg)](https://circleci.com/gh/tinker-hub/docnest-server)

## Description

Doctor Nest is built from nest for the doctors of tomorrow 🔥 🔥 🔥 

## Installation

```bash
$ npm install
```

## Database Setup

```psql
# CREATE DATABASE docnest_dev;
# \c docnest_dev
# CREATE EXTENSION citext;
# CREATE EXTENSION pg_trgm;
# CREATE USER docnest WITH PASSWORD 'docnest';
# GRANT ALL PRIVILEGES ON DATABASE "docnest_dev" to docnest;

# CREATE DATABASE docnest_test;
# \c docnest_test
# CREATE EXTENSION citext;
# CREATE EXTENSION pg_trgm;
# CREATE USER docnest_test WITH PASSWORD 'docnest_test';
# GRANT ALL PRIVILEGES ON DATABASE "docnest_test" to docnest;
# \q
```

## Database Migrations
Database migration uses the TypeORM migration it connects through
the given config of ormconfig.js. Add NODE_ENV to run on different env,
configurations were catch by config module by default

```bash
# creating migration
$ npm run migration:create --name MigrationName

# running up migration
$ npm run migration:up

# running down migration
$ npm run migration:down
```

## Running the app

```bash
# development
$ npm run start

# staging mode
$ npm run start:staging

# production mode
npm run start:production
```

## Test

```bash
# unit tests
$ npm run test
```
