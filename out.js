(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./index":5}],2:[function(require,module,exports){
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

    svg.append("ellipse")
      .attr("cx", x1)
      .attr("cy", y1)
      .attr("rx", getRandom(radiusMax) + 2)
      .attr("ry", getRandom(radiusMax) + 2)
      .attr("fill", fill)
      .attr('stroke', strokeColor)
      .attr('stroke-width', strokeWidth);
    added += 1;
  }

};

},{"../helpers/colors":4}],3:[function(require,module,exports){
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

},{"../helpers/colors":4}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
(function (global){
var d3 = (typeof window !== "undefined" ? window.d3 : typeof global !== "undefined" ? global.d3 : null);
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./drawers/circles":2,"./drawers/lines":3,"seed-random":6}],6:[function(require,module,exports){
(function (global){
'use strict';

var width = 256;// each RC4 output is 0 <= x < 256
var chunks = 6;// at least six RC4 outputs for each double
var digits = 52;// there are 52 significant digits in a double
var pool = [];// pool: entropy pool starts empty
var GLOBAL = typeof global === 'undefined' ? window : global;

//
// The following constants are related to IEEE 754 limits.
//
var startdenom = Math.pow(width, chunks),
    significance = Math.pow(2, digits),
    overflow = significance * 2,
    mask = width - 1;


var oldRandom = Math.random;

//
// seedrandom()
// This is the seedrandom function described above.
//
module.exports = function(seed, options) {
  if (options && options.global === true) {
    options.global = false;
    Math.random = module.exports(seed, options);
    options.global = true;
    return Math.random;
  }
  var use_entropy = (options && options.entropy) || false;
  var key = [];

  // Flatten the seed string or build one from local entropy if needed.
  var shortseed = mixkey(flatten(
    use_entropy ? [seed, tostring(pool)] :
    0 in arguments ? seed : autoseed(), 3), key);

  // Use the seed to initialize an ARC4 generator.
  var arc4 = new ARC4(key);

  // Mix the randomness into accumulated entropy.
  mixkey(tostring(arc4.S), pool);

  // Override Math.random

  // This function returns a random double in [0, 1) that contains
  // randomness in every bit of the mantissa of the IEEE 754 value.

  return function() {         // Closure to return a random double:
    var n = arc4.g(chunks),             // Start with a numerator n < 2 ^ 48
        d = startdenom,                 //   and denominator d = 2 ^ 48.
        x = 0;                          //   and no 'extra last byte'.
    while (n < significance) {          // Fill up all significant digits by
      n = (n + x) * width;              //   shifting numerator and
      d *= width;                       //   denominator and generating a
      x = arc4.g(1);                    //   new least-significant-byte.
    }
    while (n >= overflow) {             // To avoid rounding up, before adding
      n /= 2;                           //   last byte, shift everything
      d /= 2;                           //   right using integer Math until
      x >>>= 1;                         //   we have exactly the desired bits.
    }
    return (n + x) / d;                 // Form the number within [0, 1).
  };
};

module.exports.resetGlobal = function () {
  Math.random = oldRandom;
};

//
// ARC4
//
// An ARC4 implementation.  The constructor takes a key in the form of
// an array of at most (width) integers that should be 0 <= x < (width).
//
// The g(count) method returns a pseudorandom integer that concatenates
// the next (count) outputs from ARC4.  Its return value is a number x
// that is in the range 0 <= x < (width ^ count).
//
/** @constructor */
function ARC4(key) {
  var t, keylen = key.length,
      me = this, i = 0, j = me.i = me.j = 0, s = me.S = [];

  // The empty key [] is treated as [0].
  if (!keylen) { key = [keylen++]; }

  // Set up S using the standard key scheduling algorithm.
  while (i < width) {
    s[i] = i++;
  }
  for (i = 0; i < width; i++) {
    s[i] = s[j = mask & (j + key[i % keylen] + (t = s[i]))];
    s[j] = t;
  }

  // The "g" method returns the next (count) outputs as one number.
  (me.g = function(count) {
    // Using instance members instead of closure state nearly doubles speed.
    var t, r = 0,
        i = me.i, j = me.j, s = me.S;
    while (count--) {
      t = s[i = mask & (i + 1)];
      r = r * width + s[mask & ((s[i] = s[j = mask & (j + t)]) + (s[j] = t))];
    }
    me.i = i; me.j = j;
    return r;
    // For robust unpredictability discard an initial batch of values.
    // See http://www.rsa.com/rsalabs/node.asp?id=2009
  })(width);
}

//
// flatten()
// Converts an object tree to nested arrays of strings.
//
function flatten(obj, depth) {
  var result = [], typ = (typeof obj)[0], prop;
  if (depth && typ == 'o') {
    for (prop in obj) {
      try { result.push(flatten(obj[prop], depth - 1)); } catch (e) {}
    }
  }
  return (result.length ? result : typ == 's' ? obj : obj + '\0');
}

//
// mixkey()
// Mixes a string seed into a key that is an array of integers, and
// returns a shortened string seed that is equivalent to the result key.
//
function mixkey(seed, key) {
  var stringseed = seed + '', smear, j = 0;
  while (j < stringseed.length) {
    key[mask & j] =
      mask & ((smear ^= key[mask & j] * 19) + stringseed.charCodeAt(j++));
  }
  return tostring(key);
}

//
// autoseed()
// Returns an object for autoseeding, using window.crypto if available.
//
/** @param {Uint8Array=} seed */
function autoseed(seed) {
  try {
    GLOBAL.crypto.getRandomValues(seed = new Uint8Array(width));
    return tostring(seed);
  } catch (e) {
    return [+new Date, GLOBAL, GLOBAL.navigator && GLOBAL.navigator.plugins,
            GLOBAL.screen, tostring(pool)];
  }
}

//
// tostring()
// Converts an array of charcodes to a string
//
function tostring(a) {
  return String.fromCharCode.apply(0, a);
}

//
// When seedrandom.js is loaded, we immediately mix a few bits
// from the built-in RNG into the entropy pool.  Because we do
// not want to intefere with determinstic PRNG state later,
// seedrandom will not call Math.random on its own again after
// initialization.
//
mixkey(Math.random(), pool);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
