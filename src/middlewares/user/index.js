const checkAuthorization = require( './checkAuthorization.js' );
const extractUserId = require( './extractUserId.js' );
const comparePassword = require( './comparePassword.js' );
const findUserByEmail = require( './findUserByEmail.js' );

module.exports = {
  checkAuthorization,
  extractUserId,
  comparePassword,
  findUserByEmail,
};