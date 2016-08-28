// 'use strict';
var uuid = require('node-uuid');

var bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    token: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Document)
      },
      validPassword: function(user,password) {
        return bcrypt.compareSync(password,user.password);
      }
    },

    instanceMethods : {
      validToken: function(user,token){
        return user.token === token;
      }
    },
    hooks: {
      beforeCreate: function(user, options){
        user.password = bcrypt.hashSync(this.password,bcrypt.genSaltSync(8));
        user.token = uuid.v4();
      }
    }
  });
  return User;
};