var expect = require('chai').expect;
var UserModel = require('../../models').User;
var userdata = { first_name: 'Leonard', last_name: 'of Quirm', email: 'leonard@quirm.am', password: 'renaissance'};

describe('User Model',function(){
    //get department model and create test instance
    beforeEach(function () {
        this.user = UserModel.build(userdata);
    });

    //clear db
    after(function(){
        return UserModel.sequelize.sync({ force: true });
    });

    it('creates a user instance',function(){
        expect(this.user).to.not.be.null;
        expect(this.user.first_name).to.equal('Leonard');
        expect(this.user.last_name).to.equal('of Quirm');
        expect(this.user.email).to.equal('leonard@quirm.am');
    });

    it('creates a new user in the db',function(){
        return this.user.save().then(function(department){
            return UserModel.count().then(function(count){
                expect(count).to.equal(1);
                return UserModel.find({where: {first_name: 'Leonard'}}).then(function(user){
                    expect(user).to.not.be.null;
                    expect(user.last_name).to.equal('of Quirm');
                    expect(user.password).to.not.equal('renaissance');
                });
            });
        });
    });

    it('fetches a user from the db',function() {
        return UserModel.find({where: {first_name: 'Leonard'}}).then(function (user) {
            expect(user).to.not.be.null;
            expect(user.last_name).to.equal('of Quirm');
            expect(user.password).to.not.equal('renaissance');
        });
    });

    it('updates a user in the db',function(){
        return UserModel.find({where: {first_name: 'Leonard'}}).then(function(user){
            user.first_name = 'Lionel';
            var userid = user.id;
            return user.save().then(function(){
                return UserModel.find({where: {id: userid}}).then(function(user){
                    expect(user.first_name).to.equal('Lionel');
                });
            })
        });
    });

    it('deletes a user from the db',function(){
        return UserModel.destroy({where: {first_name: 'Lionel'}}).then(function(){
            return UserModel.count().then(function(count){
                expect(count).to.equal(0);
            });
        });
    });

});