const express = require( 'express' );
const { UserController } = require( '../controllers' );
const { extractUserId } = require( './../middlewares/user' );
const userRouter = express.Router();

userRouter.route( '/user(/:id)?' )
          .post( UserController.createUser )
          .all( extractUserId )
          .get( UserController.getUserById )
          .patch( UserController.updateUserById )
          .delete( UserController.deleteUserById );

module.exports = userRouter;