var getColor = require('../helpers/colors');

module.exports = function(svgContainer, getRandom) {
  var width = svgContainer.attr('width');
  var height = svgContainer.attr('height');
  var lineFunction = d3.svg.line()
    .x(function(d) { return d.x; })
    .y(function(d) { return d.y; })
    .interpolate('linear');
  var numLines = getRandom(Math.floor(width / 20)) + 1;
  // Make some lines.
  var linesAdded = 0;
  while (linesAdded < numLines) {
    var lines = [];
    lines.push({
      x: getRandom(width),
      y: getRandom(height)
    });
    lines.push({
      x: getRandom(width),
      y: getRandom(height)
    });
    // Adding fill is 50/50.
    var addFill = getRandom(2) + 1;
    var fill = 'none';
    if (addFill === 1) {
      fill = getColor(getRandom);
    }

    svgContainer.append("path")
      .attr("d", lineFunction(lines))
      .attr("stroke", getColor(getRandom))
      .attr("stroke-width", getRandom(Math.floor(height / 4)))
      .attr("fill", fill);
    linesAdded += 1;
  }
};
