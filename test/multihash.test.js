/* global describe, it, expect */

var MultiHash = require('../lib/multihash');


describe('MultiHash', function() {
  
  describe('with no elements', function() {
    var hash = new MultiHash();
    
    it('should have length of zero', function() {
      expect(hash.length).to.equal(0);
    });
    
    it('should not have keys', function() {
      expect(hash.keys()).to.have.length(0);
    });
    
    it('should not have non-present key', function() {
      expect(hash.has('foo')).to.be.false;
      expect(hash.count('foo')).to.equal(0);
      expect(hash.values('foo')).to.have.length(0);
    });
    
    it('should not yield any key-value pairs when iterating', function() {
      var obj = [];
      hash.forEach(function(key, value) {
        obj.push({ key: key, value: value });
      });
      
      expect(obj).to.have.length(0);
    });
  });
  
  describe('with two single-value elements', function() {
    var hash = new MultiHash();
    hash.put('hello', 'world');
    hash.put('foo', 'bar');
    
    it('should have length of two', function() {
      expect(hash.length).to.equal(2);
    });
    
    it('should have keys', function() {
      var keys = hash.keys();
      expect(keys).to.have.length(2);
      expect(keys[0]).to.equal('hello');
      expect(keys[1]).to.equal('foo');
    });
    
    it('should have present keys', function() {
      expect(hash.has('hello')).to.be.true;
      expect(hash.count('hello')).to.equal(1);
      expect(hash.values('hello')).to.have.length(1);
      expect(hash.values('hello')[0]).to.equal('world');
      
      expect(hash.has('foo')).to.be.true;
      expect(hash.count('foo')).to.equal(1);
    });
    
    it('should yield key-value pairs when iterating', function() {
      var obj = [];
      hash.forEach(function(key, value) {
        obj.push({ key: key, value: value });
      });
      
      expect(obj).to.have.length(2);
      expect(obj[0].key).to.equal('hello');
      expect(obj[0].value).to.equal('world');
      expect(obj[1].key).to.equal('foo');
      expect(obj[1].value).to.equal('bar');
    });
  });
  
  describe('with one multi-value element', function() {
    var hash = new MultiHash();
    hash.put('foo', 'bar');
    hash.put('foo', 'baz');
    
    it('should have length of two', function() {
      expect(hash.length).to.equal(1);
    });
    
    it('should have keys', function() {
      var keys = hash.keys();
      expect(keys).to.have.length(1);
      expect(keys[0]).to.equal('foo');
    });
    
    it('should have present key', function() {
      expect(hash.has('foo')).to.be.true;
      expect(hash.count('foo')).to.equal(2);
      expect(hash.values('foo')).to.have.length(2);
      expect(hash.values('foo')[0]).to.equal('bar');
      expect(hash.values('foo')[1]).to.equal('baz');
    });
    
    it('should yield key-value pairs when iterating', function() {
      var obj = [];
      hash.forEach(function(key, value) {
        obj.push({ key: key, value: value });
      });
      
      expect(obj).to.have.length(2);
      expect(obj[0].key).to.equal('foo');
      expect(obj[0].value).to.equal('bar');
      expect(obj[1].key).to.equal('foo');
      expect(obj[1].value).to.equal('baz');
    });
    
    it('should yield last key-value pair when iterating with flatten option', function() {
      var obj = [];
      hash.forEach(function(key, value) {
        obj.push({ key: key, value: value });
      }, { flatten: true });
      
      expect(obj).to.have.length(1);
      expect(obj[0].key).to.equal('foo');
      expect(obj[0].value).to.equal('baz');
    });
  });
  
  describe('#add', function() {
    
    describe('objects containing different keys', function() {
      var hash = new MultiHash();
      hash.add({ foo: 'x' });
      hash.add({ bar: 'y', baz: 'z' });
      
      it('should contain keys and values', function() {
        expect(hash.length).to.equal(3);
        expect(hash.keys()[0]).to.equal('foo');
        expect(hash.values('foo')[0]).to.equal('x');
        expect(hash.keys()[1]).to.equal('bar');
        expect(hash.values('bar')[0]).to.equal('y');
        expect(hash.keys()[2]).to.equal('baz');
        expect(hash.values('baz')[0]).to.equal('z');
      });
    });
    
    describe('objects containing same keys', function() {
      var hash = new MultiHash();
      hash.add({ hello: 'bob' });
      hash.add({ hello: 'joe' });
      
      it('should contain keys and values', function() {
        expect(hash.length).to.equal(1);
        expect(hash.keys()[0]).to.equal('hello');
        expect(hash.values('hello')[0]).to.equal('bob');
        expect(hash.values('hello')[1]).to.equal('joe');
      });
    });
    
    describe('null object', function() {
      var hash = new MultiHash();
      
      it('should have length 1 after valid object', function() {
        hash.add({ hello: 'bob' });
        expect(hash.length).to.equal(1);
      });
      
      it('should have length 1 after invalid object', function() {
        hash.add(null);
        expect(hash.length).to.equal(1);
      });
    });
    
  });
  
});
