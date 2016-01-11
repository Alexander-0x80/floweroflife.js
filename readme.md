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

When points are generated you may draw the pattern with your favorite library of choice:

```javascript

// Image size
var size_x = 800, size_y = 600;
var radius = 40;

// Using snapsvg.io here
var s = Snap(size_x, size_y);
var f = flower(size_x / 2, size_y / 2, radius, 4);
f.points().forEach((p) => s.circle(p.x, p.y, radius));

```
