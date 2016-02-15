/*global document */
'use strict';
var d3 = require('d3');
var msg2svg = require('./index.js').bind(null, document);

var redraw = function(seed) {
  d3.select('svg')
    .remove();

  var svg = msg2svg(seed, {
    width: 1000,
    height: 400
  });
  d3.select('body')
    .node().appendChild(svg.node());

};

redraw(Math.random());

document.getElementById('redraw').addEventListener('click', function() {
  redraw(document.getElementById('seed').value);
});
