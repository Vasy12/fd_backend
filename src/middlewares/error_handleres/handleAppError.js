const { ApplicationError } = require( '../../utils/application_errors' );
module.exports = (error, req, res, next) => {
  if (error instanceof ApplicationError) {
    res.status( error.status ).send( error.message );
  }
  next( error );
};