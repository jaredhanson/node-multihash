/* global describe, it, expect */

var multihash = require('..');

describe('multihash', function() {
  
  it('should export constructor', function() {
    expect(multihash).to.be.an('function');
    expect(multihash.MultiHash).to.be.an('function');
    expect(multihash).to.equal(multihash.MultiHash);
  });
  
});
