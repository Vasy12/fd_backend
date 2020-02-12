const { Task } = require( '../models' );

class TaskController {

  createTask = async (req, res, next) => {
    req.body.userId = req.headers.authorization;
    const createdTask = await Task.create( req.body );
    res.send( createdTask );
  };

  getTaskById = async (req, res, next) => {

    const Task = await Task.findByPk( req.params.id );
    return res.send( Task );
  };

  updateTaskById = async (req, res, next) => {

    const [updatedRowsCount, rows] = await Task.update( req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
    } );
    if (updatedRowsCount) {
      return res.send( rows[0] );
    }
    res.status( 404 ).send( 'Error 404. Task not found.' );

  };

  deleteTaskById = async (req, res, next) => {
    const deletedRowCount = await Task.destroy( {
                                                  where: {
                                                    id: req.params.id
                                                  }
                                                } );
    if (deletedRowCount) {
      return res.send( 'Task has been deleted.' );
    }
    res.status( 404 ).send( 'Error 404. Task not found.' );
  };
}

module.exports = new TaskController();