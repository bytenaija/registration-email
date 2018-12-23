'use strict';

module.exports = {
  env: 'development',
  db: process.env.MONGODB_URI_DEVELOPMENT,
  port: process.env.PORT || 4000,
};