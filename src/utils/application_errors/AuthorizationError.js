const ApplicationError = require( './ApplicationError.js' );

class AuthorizationError extends ApplicationError {
  constructor () {
    super( 'The request requires user authentication.', 401 );
  }
}

module.exports = AuthorizationError;