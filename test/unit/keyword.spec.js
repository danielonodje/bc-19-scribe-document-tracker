var expect = require('chai').expect;
var KeywordModel = require('../../models').Keyword;
var keyworddata = {name: 'a new key'};

describe('Keyword Model',function () {
    //get keyword model and create test instance
    beforeEach(function () {
        this.keyword = KeywordModel.build(keyworddata);
    });

    //clear db
    after(function(){
        return KeywordModel.sequelize.sync({ force: true });
    });

    it('creates a keyword instance',function(){
        expect(this.keyword).to.not.be.null;
        expect(this.keyword.name).to.equal('a new key');
    });

    it('creates a new keyword in the db',function(){
        return this.keyword.save().then(function(keyword){
            return KeywordModel.count().then(function(count){
                expect(count).to.equal(1);
                return KeywordModel.find({where: {name: 'a new key'}}).then(function(keyword){
                    expect(keyword).to.not.be.null;
                    expect(keyword.name).to.equal('a new key');
                });
            });

        });
    });

    it('fetches a keyword from the db',function() {
        return KeywordModel.find({where: {name: 'a new key'}}).then(function (keyword) {
            expect(keyword).to.not.be.null;
            expect(keyword.name).to.equal('a new key');
        });
    });

    it('updates a keyword in the db',function(){
        return KeywordModel.find({where: {name: 'a new key'}}).then(function(keyword){
            keyword.name = 'another key';
            var keyid = keyword.id;
            return keyword.save().then(function(){
                return KeywordModel.find({where: {id: keyid}}).then(function(keyword){
                    expect(keyword.name).to.equal('another key');
                });
            })
        });
    });

    it('deletes a keyword from the db',function(){
        return KeywordModel.destroy({where: {name: 'another key'}}).then(function(){
            return KeywordModel.count().then(function(count){
                expect(count).to.equal(0);
                return KeywordModel.find({where: {name: 'another key'}}).then(function(keyword){
                    expect(keyword).to.be.null;
                });
            });
        });
    });
});