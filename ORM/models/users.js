'use strict';
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'first_name'
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'last_name'
    },
    phone: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true,
      validate: {
        not: ["[a-z]",'i'] //letters not allowed
      }        
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false      
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false      
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false      
    },
    zipcode: {
      type: DataTypes.STRING,
      allowNull: false      
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'is_public'
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at'
    }
  }, {}); 

  users.beforeCreate((user, options) => {
    return bcrypt
      .hash(user.password, 10)
      .then(hash => {
        user.password = hash;
      })
      .catch(err => {
        console.error("Bcrypt error: ", err)
        throw new Error(err);
      });
  });

  users.associate = (models) => {
    users.belongsToMany(models.groups, {
      through: models.groups_admins,
      as: 'groupAdmins',
      foreignKey: 'groupsId',
      onDelete: 'CASCADE'
    });

    users.belongsToMany(models.groups, {
      through: models.users_groups,
      as: 'userGroups',
      foreignKey: 'groupsId',
      onDelete: 'CASCADE'
    });
  }

  return users;
};