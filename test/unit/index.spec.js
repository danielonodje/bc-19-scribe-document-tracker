var expect = require('chai').expect;
var models = require('../../models');

describe('models/index',function(){
    it('returns the department model',function(){
        expect(models.Department).to.be.ok;
    });
    it('returns the document model',function(){
        expect(models.Document).to.be.ok;
    });
    it('returns the keyword model',function(){
        expect(models.Keyword).to.be.ok;
    });
    it('returns the user model',function(){
        expect(models.User).to.be.ok;
    });
});