var expect = require('chai').expect;
var models = require('../../models');
var DocumentModel = require('../../models').Document;
var UserModel = require('../../models').User;
var DepartmentModel = require('../../models').Department;
var userdata = { first_name: 'Leonard', last_name: 'of Quirm', email: 'leonard@quirm.am', password: 'renaissance'};
var departmentdata = {name: 'success'};
var documentdata = {title:'a document', link: 'http://www.document.org', description: 'a document description', UserId: '', DocumentId: ''};


describe('Document Model',function(){

    //clear db
    before(function(){
        return models.sequelize.sync({ force: true });
    });

    //clear db
    after(function(){
        return models.sequelize.sync({ force: true });
    });


    it('creates a new document in the database',function(){
        DepartmentModel.create(departmentdata).then(function(department){
            documentdata.DepartmentId = department.id;
            return UserModel.create(userdata).then(function(user){
                documentdata.UserId = user.id;
                return DocumentModel.create(documentdata).then(function(document){
                    return DocumentModel.count().then(function(count){
                        expect(count).to.equal(1);
                    });
                });
            });
        });
    });


    it('fetches a document from the db',function(){
        DepartmentModel.create(departmentdata).then(function(department){
            documentdata.DepartmentId = department.id;
            return UserModel.create(userdata).then(function(user){
                documentdata.UserId = user.id;
                return DocumentModel.create(documentdata).then(function(document){
                    return DocumentModel.find({where: {title: departmentdata.title}}).then(function(document){
                        expect(document).to.not.be.null;
                        expect(document.title).to.equal(documentdata.title);
                    });
                });
            });
        });
    });

    it('updates a document in the db',function(){
        DepartmentModel.create(departmentdata).then(function(department){
            documentdata.DepartmentId = department.id;
            return UserModel.create(userdata).then(function(user){
                documentdata.UserId = user.id;
                return DocumentModel.create(documentdata).then(function(document){
                    return DocumentModel.find({where: {title: departmentdata.title}}).then(function(document){
                        document.title = "document title";
                        document.save().then(function(document){
                            documentid = document.id;
                            return DocumentModel.find({where: {id: documentid}}).then(function(document){
                                expect(document.title).to.equal("document title");
                            });
                        });
                    });
                });
            });
        });
    });

    it('deletes a document in the db',function(){
        DepartmentModel.create(departmentdata).then(function(department){
            documentdata.DepartmentId = department.id;
            return UserModel.create(userdata).then(function(user){
                documentdata.UserId = user.id;
                return DocumentModel.create(documentdata).then(function(document){
                    return DocumentModel.find({where: {title: departmentdata.title}}).then(function(document){
                        document.title = "document title";
                        document.destroy().then(function(document){
                            documentid = document.id;
                            return DocumentModel.find({where: {id: documentid}}).then(function(document){
                                expect(document).to.be.null;
                                //equal("document title");
                            });
                        });
                    });
                });
            });
        });
    });
});
