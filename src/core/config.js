require('dotenv').config();

module.exports = {
  MONGODB_URI: process.env.MONGODB_URI,
  MONGODB_TEST_URI: process.env.MONGODB_TEST_URI,
  JWT_SECRETE_KEY: process.env.JWT_SECRETE_KEY,
  PORT: process.env.PORT || 9000,
  TOKEN_DURATION: process.env.TOKEN_DURATION || '720h',
  TEST_TOKEN: process.env.TEST_TOKEN,
  INVALID_TEST_TOKEN: process.env.INVALID_TEST_TOKEN,
};