var msg2svg = require('./index');

var redraw = function(seed) {
  d3.select("svg")
    .remove();
  msg2svg(seed, {
    width: 1000,
    height: 400
  });

};

redraw(Math.random());

document.getElementById('redraw').addEventListener('click', function() {
  redraw(document.getElementById('seed').value);
});
