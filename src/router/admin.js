const express = require( 'express' );
const { User } = require( './../models' );
const adminRouter = express.Router();

adminRouter.route( '/users' )
           .get( async (req, res, next) => {
             try {
               const users = await User.findAll( {
                                                   limit: 40,
                                                   offset: 0
                                                 } );
               res.send( users );
               ;
             } catch (e) {
               next( e );
             }
           } );

module.exports = adminRouter;

