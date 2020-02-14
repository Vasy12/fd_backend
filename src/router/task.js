const express = require( 'express' );
const { TaskController } = require( '../controllers' );

const taskRouter = express.Router();

taskRouter.post( '', TaskController.createTask );
taskRouter.get( '/:id', TaskController.getTaskById );
taskRouter.patch( '/:id', TaskController.updateTaskById );
taskRouter.delete( '/:id', TaskController.deleteTaskById );

module.exports = taskRouter;