'use strict';
var DepartmentModel = require('../models').Department;
var departmentdata = [
    {
        name: 'Success'
    },
    {
        name: 'Training'
    },
    {
        name: 'Operations'
    },
    {
        name: 'Finance'
    },
    {
        name: 'Recruitment'
    },
    {
        name: 'Sales'
    },
    {
        name: 'Marketing'
    }
];

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
      return queryInterface.bulkInsert('Departments',departmentdata, {});
  }
  ,

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    DepartmentModel.sync({force: true});
  }
};
