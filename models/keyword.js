'use strict';
module.exports = function(sequelize, DataTypes) {
  var Keyword = sequelize.define('Keyword', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Keyword.hasMany(models.Document)
      }
    }
  });
  return Keyword;
};