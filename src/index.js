const { TaskController, UserController } = require( './controllers' );

const express = require( 'express' );

const PORT = process.env.NODE_ENV || 3000;

const app = express();
app.use( express.json() );
app.post( '/user', UserController.createUser );
app.get( '/user/:id', UserController.getUserById );
app.patch( '/user/:id', UserController.updateUserById );
app.delete( '/user/:id', UserController.deleteUserById );

app.post( '/Task', TaskController.createTask );
app.get( '/Task/:id', TaskController.getTaskById );
app.patch( '/Task/:id', TaskController.updateTaskById );
app.delete( '/Task/:id', TaskController.deleteTaskById );

app.listen( PORT, () => {
  console.log( `Example app listening on port ${PORT}!` );
} );