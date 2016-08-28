'use strict';

module.exports = function(sequelize, DataTypes) {
  var Keyword = sequelize.define('Keyword', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
          Keyword.belongsToMany(models.Document, {
              through: models.DocumentKeyword
          })
      }
    }
  });
  return Keyword;
};