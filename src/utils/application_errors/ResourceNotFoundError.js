const ApplicationError = require( './ApplicationError.js' );

class ResourceNotFoundError extends ApplicationError {
  constructor (resource) {
    super( `Error 404: ${`"${resource}"` || 'resource'} not found`, 404 );
  }
}

module.exports = ResourceNotFoundError;