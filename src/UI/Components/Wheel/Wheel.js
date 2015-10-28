(function (app) {

    app.directive('uiWheel', [
        '$parse',
        function ($parse) {
            return {
                restrict: 'A',
                link: function (scope, element, attr) {

                    var expr = $parse(attr['uiWheel']),
                        fn = function (event, delta, deltaX, deltaY) {
                            scope.$apply(function () {
                                expr(scope, {
                                    $event: event,
                                    $delta: delta,
                                    $deltaX: deltaX,
                                    $deltaY: deltaY
                                });
                            });
                        },
                        hamster;

                    if (typeof Hamster === 'undefined') {
                        // fallback to standard wheel event
                        element.bind('wheel', function (event) {
                            scope.$apply(function () {
                                expr(scope, {
                                    $event: event
                                });
                            });
                        });
                        return;
                    }

                    // don't create multiple Hamster instances per element
                    if (!(hamster = element.data('hamster'))) {
                        hamster = Hamster(element[0]);
                        element.data('hamster', hamster);
                    }

                    // bind Hamster wheel event
                    hamster.wheel(fn);

                    // unbind Hamster wheel event
                    scope.$on('$destroy', function () {
                        hamster.unwheel(fn);
                    });
                }
            }
        }]);

})(angular.module('UI'));