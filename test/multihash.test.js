/* global describe, it, expect */

var MultiHash = require('../lib/multihash');


describe('MultiHash', function() {
  
  describe('with no elements', function() {
    var hash = new MultiHash();
    
    it('should have length of zero', function() {
      expect(hash.length).to.equal(0);
    });
    
    it('should not have non-present key', function() {
      expect(hash.has('foo')).to.be.false;
      expect(hash.count('foo')).to.equal(0);
    });
    
    it('should not yield any key-value pairs when iterating', function() {
      var obj = [];
      hash.forEach(function(key, value) {
        obj.push({ key: key, value: value });
      });
      
      expect(obj).to.have.length(0);
    });
  });
  
});
