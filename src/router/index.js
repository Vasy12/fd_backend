const express = require( 'express' );
const { checkAuthorization } = require( '../middlewares/user' );
const userRouter = require( './user.js' );
const taskRouter = require( './task.js' );

const router = express.Router();

/*router.route( '/authorization' )
 .post( '/login', findUserByEmail, comparePassword, )
 .post( '/signup', );*/

router.use( checkAuthorization );
router.use( '/user', userRouter );
router.use( '/task', taskRouter );

module.exports = router;