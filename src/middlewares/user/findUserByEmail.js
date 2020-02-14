const { User } = require( '../../models' );

module.exports = async (req, res, next) => {
  try {

    const user = await User.findOne( {
                                       where: {
                                         email: req.body.email,
                                       }
                                     } );
    if (user) {
      req.user = user;
      return next();
    }
    return res.status( 404 ).send( 'User not found' );

  } catch (e) {
    next( e );
  }
};