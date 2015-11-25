/**
 * @ngdoc directive
 * @name ui.svg.uiSvgZoom
 *
 * @description
 *
 * Applies the d3 Zoom behavior to an element by updating a transform.
 *
 * @requires ui.svg.d3
 * @element g
 * @restrict A
 */
(function (app) {

    app.directive('uiSvgZoom', [
        'd3',
        function (d3) {
            return {
                restrict: 'A',
                link: function (scope, el, attr) {

                    var zoom = d3.behavior.zoom()
                        .scaleExtent([0.25, 10])
                        .on("zoom", function () {
                            d3.select(el[0]).attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
                        });

                    var $svg = el.closest('svg');
                    if($svg.length > 0) {
                        d3.select($svg[0]).call(zoom);
                    }
                }
            }
        }
    ])

})(angular.module('thinkingmedia.ui.svg'));