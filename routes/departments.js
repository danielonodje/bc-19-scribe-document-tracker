var express = require('express');
var router = express.Router();
var DepartmentModel = require('../models').Department;

/* GET documents listing. */
router.get('/', function(req, res, next) {
    DepartmentModel.findAndCountAll().then(function(result){
        var departments = [];
        result.rows.map(function(current){
            departments.push({id: current.id, name: current.name});
        });
        res.send(departments);
    });
});

module.exports = router;
