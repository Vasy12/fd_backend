const ApplicationError = require( './ApplicationError.js' );

class ForbiddenError extends ApplicationError {
  constructor () {
    super( 'The server understood the request, but is refusing to fulfill it.', 403 );
  }
}

module.exports = ForbiddenError;