(function (app) {

    app.directive('uiSvgGrid', [
        function () {
            return {
                restrict: 'A',
                link: function (scope, el, attr) {

                },
                scope: {
                    'unit': '@uiSvgGrid'
                },
                templateUrl: '/src/UI/SVG/Grid/Grid.html'
            }
        }
    ]);

})(angular.module('UI'));