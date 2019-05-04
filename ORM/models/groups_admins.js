'use strict';

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('groups_admins', {
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
};