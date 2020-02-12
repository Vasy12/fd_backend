'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn( 'Tasks', 'isDone', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false
    } );

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn( 'Tasks', 'isDone' );
  }
};
