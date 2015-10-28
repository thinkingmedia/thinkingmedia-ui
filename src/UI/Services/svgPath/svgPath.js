(function (app) {

    app.factory('$svgPath', [
        function () {
            /**
             * @name UI.svgPath
             *
             * @param {number=} x
             * @param {number=} y
             *
             * @constructor
             */
            function svgPath(x,y) {
                var _str = [];

                /**
                 * @param {number} x
                 * @param {number} y
                 * @returns {string}
                 */
                function pos(x, y) {
                    return x + ',' + y;
                }

                /**
                 * @param {number} x
                 * @param {number} y
                 * @returns {UI.svgPath}
                 */
                this.Move = function (x, y) {
                    _str.push('M ' + pos(x, y));
                    return this;
                };

                /**
                 * @param {number} x
                 * @param {number} y
                 *
                 * @returns {UI.svgPath}
                 */
                this.move = function (x, y) {
                    _str.push('m ' + pos(x, y));
                    return this;
                };

                /**
                 * @param {number} x
                 * @param {number} y
                 *
                 * @returns {UI.svgPath}
                 */
                this.Line = function (x, y) {
                    _str.push('L ' + pos(x, y));
                    return this;
                };

                /**
                 * @param {number} x
                 * @param {number} y
                 *
                 * @returns {UI.svgPath}
                 */
                this.line = function (x, y) {
                    _str.push('l ' + pos(x, y));
                    return this;
                };

                /**
                 * @param {number} x
                 *
                 * @returns {UI.svgPath}
                 */
                this.Horz = function (x) {
                    _str.push('H ' + x);
                    return this;
                };

                /**
                 * @param {number} x
                 *
                 * @returns {UI.svgPath}
                 */
                this.horz = function (x) {
                    _str.push('h ' + x);
                    return this;
                };

                /**
                 * @param {number} x
                 *
                 * @returns {UI.svgPath}
                 */
                this.Vert = function (x) {
                    _str.push('V ' + x);
                    return this;
                };

                /**
                 * @param {number} x
                 *
                 * @returns {UI.svgPath}
                 */
                this.vert = function (x) {
                    _str.push('v ' + x);
                    return this;
                };

                /**
                 * @param {number} x1
                 * @param {number} y1
                 * @param {number} x2
                 * @param {number} y2
                 * @param {number} x
                 * @param {number} y
                 *
                 * @returns {UI.svgPath}
                 */
                this.Cubic = function (x1, y1, x2, y2, x, y) {
                    _str.push('C ' + pos(x1, y1) + ' ' + pos(x2, y2) + ' ' + pos(x, y));
                    return this;
                };

                /**
                 * @param {number} x1
                 * @param {number} y1
                 * @param {number} x2
                 * @param {number} y2
                 * @param {number} x
                 * @param {number} y
                 *
                 * @returns {UI.svgPath}
                 */
                this.cubic = function (x1, y1, x2, y2, x, y) {
                    _str.push('c ' + pos(x1, y1) + ' ' + pos(x2, y2) + ' ' + pos(x, y));
                    return this;
                };

                /**
                 * @param {number} x1
                 * @param {number} y1
                 * @param {number} x
                 * @param {number} y
                 *
                 * @returns {UI.svgPath}
                 */
                this.SmoothCubic = function (x1, y1, x, y) {
                    _str.push('S ' + pos(x1, y1) + ' ' + pos(x, y));
                    return this;
                };

                /**
                 * @param {number} x1
                 * @param {number} y1
                 * @param {number} x
                 * @param {number} y
                 *
                 * @returns {UI.svgPath}
                 */
                this.smoothCubic = function (x1, y1, x, y) {
                    _str.push('s ' + pos(x1, y1) + ' ' + pos(x, y));
                    return this;
                };

                /**
                 * @param {number} x1
                 * @param {number} y1
                 * @param {number} x
                 * @param {number} y
                 *
                 * @returns {UI.svgPath}
                 */
                this.Quad = function (x1, y1, x, y) {
                    _str.push('Q ' + pos(x1, y1) + ' ' + pos(x, y));
                    return this;
                };

                /**
                 * @param {number} x1
                 * @param {number} y1
                 * @param {number} x
                 * @param {number} y
                 *
                 * @returns {UI.svgPath}
                 */
                this.quad = function (x1, y1, x, y) {
                    _str.push('q ' + pos(x1, y1) + ' ' + pos(x, y));
                    return this;
                };

                /**
                 * @param {number} x
                 * @param {number} y
                 *
                 * @returns {UI.svgPath}
                 */
                this.SmoothQuad = function (x, y) {
                    _str.push('T ' + pos(x, y));
                    return this;
                };

                /**
                 * @param {number} x
                 * @param {number} y
                 *
                 * @returns {UI.svgPath}
                 */
                this.smoothQuad = function (x, y) {
                    _str.push('t ' + pos(x, y));
                    return this;
                };

                /**
                 * @param {number} rx
                 * @param {number} ry
                 * @param xAxis
                 * @param flag
                 * @param sweepFlag
                 * @param {number} x
                 * @param {number} y
                 *
                 * @returns {UI.svgPath}
                 */
                this.Arc = function(rx, ry, xAxis, flag, sweepFlag, x, y) {
                    _str.push('A ' + pos(rx, ry) + ' ' + xAxis + ' ' + flag + ' ' + sweepFlag + ' ' + pos(x,y));
                    return this;
                };

                /**
                 * @param {number} rx
                 * @param {number} ry
                 * @param xAxis
                 * @param flag
                 * @param sweepFlag
                 * @param {number} x
                 * @param {number} y
                 *
                 * @returns {UI.svgPath}
                 */
                this.arc = function(rx, ry, xAxis, flag, sweepFlag, x, y) {
                    _str.push('a ' + pos(rx, ry) + ' ' + xAxis + ' ' + flag + ' ' + sweepFlag + ' ' + pos(x,y));
                    return this;
                };

                /**
                 * @returns {UI.svgPath}
                 */
                this.Close = function() {
                    _str.push('Z');
                    return this;
                };

                /**
                 * @returns {UI.svgPath}
                 */
                this.close = function() {
                    _str.push('z');
                    return this;
                };

                /**
                 * @returns {string}
                 */
                this.toString = function () {
                    return _str.join(' ');
                };

                if(angular.isNumber(x) && angular.isNumber(y)) {
                    this.Move(x,y);
                }
            }

            return svgPath;
        }
    ]);

})(angular.module('UI'));