const { User } = require( '../models' );
const Controller = require( '../utils/controller' );

class UserController {
  constructor () {
    this._controller = new Controller( User );
  }

  createUser = async (req, res, next) => {
    try {
      const newUser = await this._controller.create( req.body );
      const userData = newUser.get();
      delete userData.password;
      res.send( userData );

    } catch (e) {
      next( e );
    }
  };
  updateUserById = async (req, res, next) => {
    try {
      const updatedUser = await this._controller.update( req.userId, req.body );
      const data = updatedUser.get();
      delete data.password;
      return res.send( data );
    } catch (e) {
      next( e );
    }
  };
  getUserById = async (req, res, next) => {
    try {
      res.send( await this._controller.read( req.userId, {
        attributes: {
          exclude: ['password'],
        }
      } ) );
    } catch (e) {
      next( e );
    }
  };

  deleteUserById = async (req, res, next) => {
    try {
      res.send( `${await this._controller.delete( req.userId )}` );
    } catch (e) {
      next( e );
    }
  };

}

module.exports = new UserController();