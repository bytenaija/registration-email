'use strict';

module.exports = {
  env: 'test',
  db: process.env.MONGODB_URI_TEST,
  port: process.env.PORT || 5001,
};