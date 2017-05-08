msg2svg
=======

[![Greenkeeper badge](https://badges.greenkeeper.io/eiriksm/msg2svg.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/eiriksm/msg2svg.svg?branch=master)](https://travis-ci.org/eiriksm/msg2svg)
[![Coverage Status](http://img.shields.io/coveralls/eiriksm/msg2svg.svg)](https://coveralls.io/r/eiriksm/msg2svg?branch=master)
[![Code Climate](http://img.shields.io/codeclimate/github/eiriksm/msg2svg.svg)](https://codeclimate.com/github/eiriksm/msg2svg)
[![Dependency Status](https://david-dm.org/eiriksm/msg2svg.svg?theme=shields.io)](https://david-dm.org/eiriksm/msg2svg)

## What is it?
Generates a seemingly random svg "artwork" based on a provided random seed. That way, the same words would always end up generating the same seemingly random "art".

## Demo?

Sure, this is all very useless, [but here you go](https://eiriksm.github.io/msg2svg/)

## Usage

If you for some reason need this, here it is:

### Install with npm

`npm i msg2svg`

### Require in your project

```js
'use strict';
// If in a browser environment (but built with browserify or similar), you can
// do something like this:
var msg2svg = require('msg2svg').bind(null, document);

var redraw = function(seed) {
  d3.select('svg')
    .remove();

  var svg = msg2svg(seed, {
    width: 1000,
    height: 400
  });
  d3.select('body')
    .node().appendChild(svg.node())

};

redraw(Math.random());

document.getElementById('redraw').addEventListener('click', function() {
  redraw(document.getElementById('seed').value);
});

/**
 * Yeah, so say you have HTML structure something like this:
 * <div>
 *	 <input type="text" placeholder="Enter random seed" id="seed" />
 *	 <input type="submit" value="Redraw" id="redraw" />
 * </div>
 */
document.getElementById('redraw').addEventListener('click', function() {
  redraw(document.getElementById('seed').value);
});
```

## Why did you make it?

I used it [in this simple project](https://github.com/eiriksm/turnt-octo-bear) - "an extremely persistent chat application".

Here is an animated gif from that, just since I like gifs.
![Chatting with a conversation with substance](https://raw.github.com/eiriksm/turnt-octo-bear/master/chat.gif)

## Licence
[WTFPL](http://www.wtfpl.net/)
