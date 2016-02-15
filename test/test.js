'use strict';
var msg2svg = require('./..');
require('should');
var fs = require('fs');
var document = require('jsdom').jsdom();

describe('All the things', function() {
  it('Should expose a function and return an array', function() {
    msg2svg.should.be.instanceOf(Function);
    msg2svg(document).should.be.instanceOf(Array);
  });
  it('Should always return the same thing on same random', function() {
    var random = 'this is random seed';
    // Yeah, if we init this with a second param, it's a win for coverage.
    var two = msg2svg(document, random, {document: document});
    var expected = fs.readFileSync('./test/expected.txt').toString().trim();
    expected.should.equal(two[0][0].innerHTML);
  });
});
