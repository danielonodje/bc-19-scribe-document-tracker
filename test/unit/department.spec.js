var expect = require('chai').expect;
var DepartmentModel = require('../../models').Department;
var departmentdata = {name: 'success'};

describe('Department Model',function(){
    //get department model and create test instance
    beforeEach(function () {
        this.department = DepartmentModel.build(departmentdata);
    });

    //clear db
    after(function(){
        return DepartmentModel.sequelize.sync({ force: true });
    });

    it('creates a department instance',function(){
        expect(this.department).to.not.be.null;
        expect(this.department.name).to.equal('success');
    });

    it('creates a new department in the db',function(){
        return this.department.save().then(function(department){
            return DepartmentModel.count().then(function(count){
                expect(count).to.equal(1);
                return DepartmentModel.find({where: {name: 'success'}}).then(function(department){
                    expect(department).to.not.be.null;
                    expect(department.name).to.equal('success');
                });
            });
        });
    });

    it('fetches a department from the db',function() {
        return DepartmentModel.find({where: {name: 'success'}}).then(function (department) {
            expect(department).to.not.be.null;
            expect(department.name).to.equal('success');
        });
    });

    it('updates a department in the db',function(){
        return DepartmentModel.find({where: {name: 'success'}}).then(function(department){
            department.name = 'another key';
            var deptid = department.id;
            return department.save().then(function(){
                return DepartmentModel.find({where: {id: deptid}}).then(function(department){
                    expect(department.name).to.equal('another key');
                });
            })
        });
    });

    it('deletes a department from the db',function(){
        return DepartmentModel.destroy({where: {name: 'another key'}}).then(function(){
            return DepartmentModel.count().then(function(count){
                expect(count).to.equal(0);
                return DepartmentModel.find({where: {name: 'another key'}}).then(function(department){
                    expect(department).to.be.null;
                });
            });
        });
    });
});