/**
 * @ngdoc service
 * @name ui.svg.$svgTurtle
 */
(function (app) {

    var goRight = {
        'up': 'right',
        'right': 'down',
        'down': 'left',
        'left': 'up'
    };

    var goLeft = {
        'up': 'left',
        'right': 'up',
        'down': 'right',
        'left': 'down'
    };

    app.factory('$svgTurtle', [
        '$svgPath',
        function ($svgPath) {
            /**
             * @name UI.svgTurtle
             * @extends UI.svgPath
             *
             * @param {number=} x
             * @param {number=} y
             *
             * @constructor
             */
            function svgTurtle(x, y) {

                $svgPath.call(this, x, y);

                var _dir;
                var _vec;

                /**
                 * @param {string} dir
                 *
                 * @returns {UI.svgTurtle}
                 */
                this.face = function (dir) {
                    _dir = dir.toLowerCase();
                    switch (_dir) {
                        case 'up':
                            _vec = [0, -1];
                            break;
                        case 'down':
                            _vec = [0, 1];
                            break;
                        case 'left':
                            _vec = [-1, 0];
                            break;
                        case 'right':
                            _vec = [1, 0];
                            break;
                    }
                    return this;
                };

                /**
                 * @param {number} dist
                 *
                 * @returns {UI.svgTurtle}
                 */
                this.go = function (dist) {
                    this.line(_vec[0] * dist, _vec[1] * dist);
                    return this;
                };

                /**
                 * @param {number} rad
                 *
                 * @returns {UI.svgTurtle}
                 */
                this.arcLeft = function (rad) {
                    switch (_dir) {
                        case 'up':
                            break;
                        case 'down':
                            break;
                        case 'left':
                            break;
                        case 'right':
                            break;
                    }
                    return this;
                };

                /**
                 * @returns {UI.svgTurtle}
                 */
                this.turnRight = function () {
                    return this.face(goRight[_dir]);
                };

                /**
                 * @returns {UI.svgTurtle}
                 */
                this.turnLeft = function() {
                    return this.face(goLeft[_dir]);
                };

                /**
                 * @param {number} rad
                 *
                 * @returns {UI.svgTurtle}
                 */
                this.arcRight = function (rad) {
                    var p1 = [_vec[0] * rad, _vec[1] * rad];
                    this.turnRight();
                    var p2 = [_vec[0] * rad, _vec[1] * rad];
                    this.quad(p1[0], p1[1], p1[0] + p2[0], p1[1] + p2[1]);
                    return this;
                };

                this.face('up');
            }

            // inherit the prototype of $svgPath
            svgTurtle.prototype = _.create($svgPath.prototype, {
                'constructor': svgTurtle
            });

            return svgTurtle;
        }
    ]);

})(angular.module('UI'));