'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'first_name'
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'last_name'
      },
      phone: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: true       
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false      
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false      
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false      
      },
      zipcode: {
        type: Sequelize.STRING,
        allowNull: false      
      },
      isPublic: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        field: 'is_public'
      },
      email: {
        type: Sequelize.STRING,
        validate: {
          isEmail: true
        }
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
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
    return queryInterface.dropTable('users');
  }
};