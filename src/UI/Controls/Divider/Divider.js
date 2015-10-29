/**
 * @ngdoc directive
 * @name ui.controls.uiDivider
 */
(function (app) {

    /**
     * @param {angular.ILogService} $log
     * @param {UI.Events} $uiEvents
     * @param {angular.IDocumentService} $document
     */
    function directive($log, $uiEvents, $document) {

        /**
         * @param {angular.IScope} scope
         * @param {Array.<Element>} el
         * @param {$compile.directive.Attributes} attr
         *
         * @private
         */
        function _link(scope, el, attr) {
            attr.$addClass('ui-divider ui-control');

            scope.$watch('dir', function (newValue, oldValue) {
                attr.$removeClass('ui-'+oldValue);
                attr.$addClass('ui-' + newValue);
            });

            function getDelta(event) {
                return scope.dir == 'vert' ? event.clientX : event.clientY;
            }

            angular.element(el).bind('mousedown', function (/** Event */event) {
                if (event.altKey || event.ctrlKey || event.shiftKey || ~~event.button !== 0) {
                    return;
                }

                event.preventDefault();
                attr.$addClass('ui-active');

                var start = getDelta(event);
                var end;

                $uiEvents.apply(scope, function () {
                    scope.start();
                });

                var move_id = $uiEvents.bind(scope, $document, 'mousemove', function (/**Event*/event) {
                    end = getDelta(event);
                    scope.move({'$value': end - start});
                });

                $uiEvents.once(scope, $document, 'mouseup', function (/**Event*/event) {
                    attr.$removeClass('ui-active');
                    event.preventDefault();
                    $uiEvents.unbind($document, move_id);
                    end = getDelta(event);
                    scope.move({'$value': end - start});
                    scope.end();
                });
            });
        }

        return {
            restrict: 'E',
            scope: {
                dir: '@',
                start: '&onStart',
                abort: '&onAbort',
                move: '&onMove',
                end: '&onEnd'
            },
            link: _link
        };
    }

    app.directive('uiDivider', [
        '$log',
        '$uiEvents',
        '$document',
        directive
    ]);

})(angular.module('thinkingmedia.ui.controls'));