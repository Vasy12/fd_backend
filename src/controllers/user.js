const { User } = require( '../models' );

class UserController {

  createUser = async (req, res, next) => {
    const createdUser = await User.create( req.body );
    res.send( createdUser );
  };

  getUserById = async (req, res, next) => {

    const user = await User.findByPk( req.params.id );
    return res.send( user );
  };

  updateUserById = async (req, res, next) => {

    const [updatedRowsCount, rows] = await User.update( req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
    } );
    if (updatedRowsCount) {
      return res.send( rows[0] );
    }
    res.status( 404 ).send( 'Error 404. User not found.' );

  };

  deleteUserById = async (req, res, next) => {
    const deletedRowCount = await User.destroy( {
                                                  where: {
                                                    id: req.params.id
                                                  }
                                                } );
    if (deletedRowCount) {
      return res.send( 'User has been deleted.' );
    }
    res.status( 404 ).send( 'Error 404. User not found.' );
  };
}

module.exports = new UserController();