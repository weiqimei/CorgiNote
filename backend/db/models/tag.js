'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Tag.associate = function(models) {
    Tag.hasMany(models.Note, { foreignKey: "tagId" });
    Tag.belongsTo(models.User, { foreignKey: "userId" });
  };
  return Tag;
};
