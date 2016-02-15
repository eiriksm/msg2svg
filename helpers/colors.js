'use strict';
module.exports = function(getRandom) {
  var colors = [
    'blue',
    'yellow',
    'green',
    'purple',
    'red',
    'orange',
    'white',
    'black',
    'grey',
    'violet',
    'skyblue',
    'olive',
    'navy'
  ];
  return colors[Math.floor(getRandom(colors.length))];
};
