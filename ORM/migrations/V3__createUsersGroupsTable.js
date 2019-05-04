'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users_groups', {
      usersId: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        field: 'users_id',
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id',
          as: 'usersId'
        }
      },
      groupsId: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        field: 'groups_id',
        onDelete: 'CASCADE',
        references: {
          model: 'groups',
          key: 'id',
          as: 'groupsId'
        }
      },
      createdAt: {
        type: Sequelize.DATE,
        field: 'created_at'
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: 'updated_at'
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users_groups');
  }
};