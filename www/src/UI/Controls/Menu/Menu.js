/**
 * @ngdoc directive
 * @name ui.controls.uiMenu
 * @description
 *
 * Creates a hidden pop-up menu that uses the first child as a clicking target.
 *
 * If you want the menu to be embedded in the DOME, then don't create a clickable target as a child.
 *
 * @restrict E
 * @example
 <example module="ui">
 <file name="index.html">
 </file>
 </example>
 */
(function (app) {

    /**
     * @name UI.Menu
     */
    app.directive('uiMenu', [
        '$log',
        function (/**angular.ILogService*/$log) {

            /**
             * @name ui.controls.uiMenu.Controller
             */
            function controller() {
                var $target = null;
                /**
                 * @param {JQuery} el
                 */
                this.setTarget = function (el) {
                    $target = el.length === 0
                        ? null : el;
                };
                /**
                 * @returns {JQuery|null}
                 */
                this.getTarget = function () {
                    return $target;
                }
            }

            /**
             * @param {angular.IScope} scope
             * @param {Array.<Element>} el
             * @param {$compile.directive.Attributes} attr
             * @param {ui.controls.uiMenu.Controller} $uiMenu
             * @param {function} transcludeFn
             * @private
             */
            function _link(scope, el, attr, $uiMenu, transcludeFn) {
                var $el = angular.element(el);

                $el.addClass('ui-menu');

                if(attr['uiHeight']) {
                    $log.error('ui-height is not supported on ui-menu');
                }

                transcludeFn(function (clone) {
                    var $clone = angular.element(clone);
                    var $target = $clone.find('[ui-menu-target]').first();
                    if ($target.length === 0) {
                        $target = $clone.children().not('ui-menu-items').first();
                    }
                    $uiMenu.setTarget($target);
                    $el.replaceWith($clone);
                });
            }

            return {
                restrict: 'E',
                transclude: 'element',
                scope: {
                },
                link: _link,
                controller: [
                    controller
                ],
                controllerAs: '$uiMenu'
            }
        }
    ]);

})(angular.module('thinkingmedia.ui.controls'));