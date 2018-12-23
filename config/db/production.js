'use strict';

module.exports = {
  env: 'production',
  db: process.env.MONGODB_URI_PRODUCTION,
  port: process.env.PORT || 3000,
};