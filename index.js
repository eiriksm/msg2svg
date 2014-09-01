var d3 = require('d3');
var seed = require('seed-random');

var addLines = require('./drawers/lines');
var addCircles = require('./drawers/circles');

module.exports = generateSvg;

function generateSvg(randomseed, opts) {
  if (!opts) {
    opts = {};
  }
  opts.width = opts.width || 120;
  opts.height = opts.height || 40;
  var random = seed(randomseed);
  var getRandom = function(max) {
    return Math.floor(random() * max);
  };

  //The SVG Container
  var svgContainer = d3.select("body").append("svg")
    .attr("width", opts.width)
    .attr("height", opts.height);

  addLines(svgContainer, getRandom);
  addCircles(svgContainer, getRandom);

  var svgGraph = d3.select('svg')
  .attr('xmlns', 'http://www.w3.org/2000/svg');

  return svgGraph;
}
