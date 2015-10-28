(function (app) {

    app.directive('uiSvgDrag', [
        'd3',
        '$parse',
        function (d3, $parse) {

            /**
             * @param {angular.IScope} scope
             * @param {Element[]} el
             * @param {$compile.directive.Attributes} attr
             * @private
             */
            function _link(scope, el, attr) {
                attr.$addClass('ui-svg-drag');

                var onDrag = attr.onDrag || '';
                var onDragStart = attr.onDragStart || '';
                var onDragEnd = attr.onDragEnd || '';

                var drag = d3.behavior.drag()
                    .origin(function (d) {
                        return d;
                    }).on("dragstart", function (d) {
                        d3.event.sourceEvent.stopPropagation();
                        scope.$apply(function () {
                            scope.$eval(onDragStart, {});
                        });
                    }).on("drag", function (d) {
                        scope.$apply(function () {
                            scope.$eval(onDrag, {$x: d3.event.x, $dx: d3.event.dx, $y: d3.event.y, $dy: d3.event.dy});
                        });
                    }).on("dragend", function (d) {
                        scope.$apply(function () {
                            scope.$eval(onDragEnd, {});
                        });
                    });

                d3.select(el[0])
                    .data([{"x": 0, "y": 0}])
                    .call(drag);
            }


            return {
                restrict: 'A',
                link: _link
            }
        }
    ])

})(angular.module('UI'));