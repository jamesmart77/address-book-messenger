'use strict';

module.exports = (sequelize, DataTypes) => {
  const users_groups = sequelize.define('users_groups', {
    usersId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      field: 'users_id'
    },
    groupsId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      field: 'groups_id'
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

  return users_groups;
};