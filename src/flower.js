
(function() {
    "use strict";

    var root = this;
    var previous_flower = root.flower;
    var angles = [
        60  * Math.PI / 180,
        120 * Math.PI / 180,
        180 * Math.PI / 180,
        240 * Math.PI / 180,
        300 * Math.PI / 180,
        360 * Math.PI / 180
    ];

    /**
    * @param  {Array} arr 
    * @return {Array}
    */
    var flatten = function (arr) {
        return [].concat.apply([], arr);
    }

    /**
    * @param  {Number} x 
    * @param  {Number} y 
    * @return {{x: Number, y: Number}}
    */
    var create_point = function (point_x, point_y) {
        return { "x": point_x, "y": point_y };
    }

    /**
    * @param  {point} point  The point to rotate
    * @param  {point} center Rotation center point 
    * @return {point} New point after rotation
    */
    var rotate_point = function (point, center, deg) {
        return create_point(
            center.x + (point.x - center.x) * Math.cos(deg) - (point.y - center.y) * Math.sin(deg), 
            center.y + (point.x - center.x) * Math.sin(deg) + (point.y - center.y) * Math.cos(deg)
        );
    }

    /**
    * @param  {point}   point  Needle point 
    * @param  {point[]} points Haystack of points
    * @return {Boolean} 
    */
    var point_exists = function (point, points) {
        return points.some(function (p) {
            return parseInt(p.x) == parseInt(point.x) 
                && parseInt(p.y) == parseInt(point.y);
        });
    }

    /**
    * Module Main 
    *
    * @param  {Number}  First circle x
    * @param  {Number}  First circle y
    * @param  {Number}  Circles radius
    * @param  {Number}  Number of flower layers starting from 0
    * @return {{
        layers: Function,
        points: Function,
      }}
    */
    var flower = function(seed_x, seed_y, radius, layers_no) {
        // Layer 0 is the seed
        var layers = [[create_point(seed_x, seed_y)]];
        var layer, angle, point, p;
        for(layer = 0; layer < layers_no; layer++) {
            // Reserve space for next layer
            layers.push([]);
            for (point = 0; point < layers[layer].length; point++) {
                for (angle=0; angle < angles.length; angle++) {
                    p = rotate_point(create_point(
                            layers[layer][point].x,
                            layers[layer][point].y - radius),
                            layers[layer][point], 
                            angles[angle]);

                    if (!point_exists(p, flatten(layers))) {
                        // Only new points continue generations
                        layers[layer + 1].push(p);
                    }
                }
            }
        }

        // Layers have been generated, return getters
        return {
            layers: function () {
                return layers;
            },

            points: function () {
                return flatten(layers);
            }
        }

    }

    // Avoind module conflicts
    flower.no_conflict = function() {
        root.flower = previous_flower;
        return flower;
    }

    // Browser or node.js ?
    if( typeof exports !== "undefined" ) {
        if( typeof module !== "undefined" && module.exports ) {
            exports = module.exports = flower;
        }
        exports.flower = flower;
    } else {
        root.flower = flower;
    }
}).call(this);