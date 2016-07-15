'use strict';
var d3 = require('d3');
var seed = require('seed-random');

var addLines = require('./drawers/lines');
var addCircles = require('./drawers/circles');

module.exports = generateSvg;

function generateSvg(document, randomseed, opts) {
  if (!opts) {
    opts = {};
  }
  opts.width = opts.width || 120;
  opts.height = opts.height || 40;
  var random = seed(randomseed);
  var getRandom = function(max) {
    return Math.floor(random() * max);
  };

  var svg = document.createElementNS(d3.namespaces.svg, 'svg');
  var svgContainer = d3.select(svg);
  svgContainer
    .attr('width', opts.width)
    .attr('height', opts.height);

  addLines(svgContainer, getRandom);
  addCircles(svgContainer, getRandom);

  var svgGraph = svgContainer
    .attr('xmlns', 'http://www.w3.org/2000/svg');

  return svgGraph;
}
