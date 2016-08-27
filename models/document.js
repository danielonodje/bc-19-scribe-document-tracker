'use strict';
module.exports = function(sequelize, DataTypes) {
  var Document = sequelize.define('Document', {
    title: DataTypes.STRING,
    link: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        Document.belongsTo(models.Department,{
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
        Document.belongsTo(models.User,{
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
        Document.hasMany(models.Keyword);
      }
    }
  });
  return Document;
};