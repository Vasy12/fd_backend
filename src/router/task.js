const express = require( 'express' );
const { TaskController } = require( '../controllers' );

const taskRouter = express.Router();
taskRouter.route( '/tasks' )
          .get( TaskController.getUserTasks );
taskRouter.route( '/task(/:id)?' )
          .post( TaskController.createTask )
          .get( TaskController.getTaskById )
          .patch( TaskController.updateTaskById )
          .delete( TaskController.deleteTaskById );

module.exports = taskRouter;