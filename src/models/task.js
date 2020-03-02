'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define( 'Task', {
    deadline: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
      }
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    isDone: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
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