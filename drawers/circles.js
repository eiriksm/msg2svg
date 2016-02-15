'use strict';
var getColor = require('../helpers/colors');

module.exports = function(svg, getRandom) {
  var width = svg.attr('width');
  var height = svg.attr('height');
  // Find out how many circles.
  var numCirlces = getRandom(Math.floor(width / 48)) + 1;
  var added = 0;
  while (added < numCirlces) {
    // Add a circle then.
    var fill = getColor(getRandom);
    var x1 = getRandom(width);
    var y1 = getRandom(height);
    // Don't make it too big.
    var radiusMax = Math.floor(height / 4);
    // Adding fill is 50/50.
    var addStroke = getRandom(2) + 1;
    var strokeColor = 'none';
    var strokeWidth = 0;
    if (addStroke === 1) {
      strokeColor = getColor(getRandom);
      strokeWidth = getRandom(Math.floor(height / 10)) + 1;
    }

    svg.append('ellipse')
      .attr('cx', x1)
      .attr('cy', y1)
      .attr('rx', getRandom(radiusMax) + 2)
      .attr('ry', getRandom(radiusMax) + 2)
      .attr('fill', fill)
      .attr('stroke', strokeColor)
      .attr('stroke-width', strokeWidth);
    added += 1;
  }

};
