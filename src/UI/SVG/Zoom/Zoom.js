/**
 * @ngdoc directive
 * @name ui.svg.uiSvgZoom
 * @requires ui.svg.d3
 */
(function (app) {

    app.directive('uiSvgZoom', [
        'd3',
        function (d3) {
            return {
                restrict: 'A',
                link: function (scope, el, attr) {

                    var $svg = $(el).closest('svg');

                    var zoom = d3.behavior.zoom()
                        .scaleExtent([0.25, 10])
                        .on("zoom", function () {
                            d3.select(el[0]).attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
                        });

                    d3.select($svg[0]).call(zoom);
                }
            }
        }
    ])

})(angular.module('UI'));