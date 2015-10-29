/**
 * @ngdoc directive
 * @name ui.components.uiDelayHover
 * @restrict A
 *
 * @description
 * Executes the expression after the mouse hovers over the element for 500ms or the value of ui-delay-time attribute.
 *
 * @param {expression} uiDelayHover The expression to execute after hover timeout.
 * @param {string=} uiDelayTime How long to delay before executing the expression (default is 500ms).
 *
 */
(function (app) {

    /**
     * @param {angular.ITimeoutService} $timeout
     * @constructor
     */
    function uiDelayHoverDirective($timeout) {

        /**
         * @param {angular.IScope}  scope
         * @param {Element[]} el
         * @param {$compile.directive.Attributes} attr
         **/
        function _link(scope, el, attr) {
            attr.$addClass('ui-delay-hover');

            var cancel = null;

            el.bind('mouseenter', function () {
                cancel = $timeout(function () {
                    scope.$eval(attr.uiDelayHover, {$hover: true});
                }, ~~(attr.uiDelayTime || 500));
            });

            // @todo - need a hide expression
            el.bind('mouseleave', function () {
                cancel && $timeout.cancel(cancel);
                scope.$eval(attr.uiDelayHover, {$hover: false});
            });

            scope.$on('$destroy', function () {
                cancel && $timeout.cancel(cancel);
                scope.$eval(attr.uiDelayHover, {$hover: false});
            });
        }

        return {
            restrict: 'A',
            link: _link
        }
    }

    app.directive('uiDelayHover', [
        '$timeout',
        uiDelayHoverDirective
    ]);

})(angular.module('thinkingmedia.ui.components'));