(function (app) {

    app.directive('uiSvgGrip', [
        '$svgTurtle',
        function (/** Com.svgTurtle */$svgTurtle) {

            /**
             * @param {angular.IScope} scope
             * @param {Element[]} el
             * @param {$compile.directive.Attributes} attrs
             * @private
             */
            function _link(scope, el, attrs) {
                attrs.$addClass('ui-svg-grip');

                scope.$watchGroup(['count', 'size'], function (values) {
                    var c = ~~values[0] || 3;
                    var s = ~~values[1] / c;
                    var pen = new $svgTurtle();
                    for (var x = 1; x <= c; x++) {
                        var b = s * x;
                        pen.Move(0, -b).line(-b, b);
                    }
                    scope.path = pen.toString();
                });
            }

            return {
                restrict: 'A',
                scope: {
                    'size': '@',
                    'count': '@'
                },
                link: _link,
                templateUrl: '/src/UI/SVG/Grip/Grip.html'
            }

        }
    ]);

})(angular.module('UI'));