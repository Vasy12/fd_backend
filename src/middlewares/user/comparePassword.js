const bcrypt = require( 'bcrypt' );

module.exports = async (req, res, next) => {
  try {
    if (await bcrypt.compare( req.body.password, req.user.password )) {
      return next();
    }
    return res.status( 403 ).send( 'Password invalid' );
  } catch (e) {
    next( e );
  }
};