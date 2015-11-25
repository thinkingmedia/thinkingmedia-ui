/**
 * @ngdoc service
 * @name ui.svg.d3
 */
(function (app) {

    app.provider('d3', [
        function () {
            this.$get = [
                '$window',
                function ($window) {
                    return $window.d3;
                }]
        }
    ]);

})(angular.module('thinkingmedia.ui.svg'));