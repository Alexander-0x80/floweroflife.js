floweroflife.js
===========

> This script generates a set of points ( circle centers ) which form the mystical [flower of life](https://en.wikipedia.org/wiki/Overlapping_circles_grid#Modern_usage) pattern.

### Usage: 
```javascript

var radius = 40;
var layers = 4;
// Generate 4 layers, starting from x0,y0
var f = flower(0,0 , radius, layers);

f.layers(); // Returns layered points
f.points(); // Returns all of the flower points ( layers flattened )
f.points()[0]; // Object { x: 0, y: 0 }

```

--------------------------

Here is a jsfiddle [demo](https://jsfiddle.net/7knn3x2d/3/) that uses [snap.svg](http://snapsvg.io/) to draw the pattern. Use any drawing library of your choice and create your flower.
