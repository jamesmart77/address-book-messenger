'use strict';

module.exports = (sequelize, DataTypes) => {
  const groups = sequelize.define('groups', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
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

  groups.associate = (models) => {
    groups.belongsToMany(models.users, {
      through: models.groups_admins,
      as: 'groupAdmins',
      foreignKey: 'groupsId',
      onDelete: 'CASCADE'
    });

    groups.belongsToMany(models.users, {
      through: models.users_groups,
      as: 'groupMembers',
      foreignKey: 'groupsId',
      onDelete: 'CASCADE'
    });
  }

  return groups;
};