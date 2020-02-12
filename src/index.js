const UserController = require( './controllers/user.js' );

const express = require( 'express' );

const PORT = process.env.NODE_ENV || 3000;

const app = express();
app.use( express.json() );
app.post( '/user', UserController.createUser );
app.get( '/user/:id', UserController.getUserById );
app.patch( '/user/:id', UserController.updateUserById );
app.delete( '/user/:id', UserController.deleteUserById );

app.listen( PORT, () => {
  console.log( `Example app listening on port ${PORT}!` );
} );