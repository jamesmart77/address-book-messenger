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
        type: Sequelize.INTEGER,
        allowNull: false        
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
      isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        field: 'is_admin'   
      },
      isAddressHidden: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false,
        field: 'is_address_hidden'
      },
      isPublic: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        field: 'is_public'
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notEmpty: true
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};