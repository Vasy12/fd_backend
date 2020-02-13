'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define( 'Task', {
    deadline: {
      type: DataTypes.DATE,
      validate: {
        isNull: false,
        isDate: true,
      }
    },
    value: {
      type: DataTypes.STRING,
      validate: {
        isNull: false,
        notEmpty: true,
      }
    },
    isDone: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      validate: {
        isNull: false,
      }
    },
    files: DataTypes.ARRAY( DataTypes.STRING )
  }, {} );
  Task.associate = function (models) {
    Task.belongsTo( models.User, {
      targetKey: 'id',
      foreignKey: 'userId',
    } );
  };
  return Task;
};