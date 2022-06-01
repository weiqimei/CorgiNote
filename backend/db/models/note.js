'use strict';
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    notebookId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {});
  Note.associate = function(models) {
    Note.belongsTo(models.Notebook, { foreignKey: "notebookId" });
    Note.belongsTo(models.Tag, { foreignKey: "tagId" });
    Note.belongsTo(models.User, {foreignKey: "userId"});
  };
  return Note;
};
