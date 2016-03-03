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
        function () {

            /**
             * @name ui.controls.uiMenu.Controller
             */
            function controller() {
                var $target = null;
                /**
                 * @param {jQuery} el
                 */
                this.setTarget = function (el) {
                    $target = el.length === 0
                        ? null : el;
                };
                /**
                 * @returns {jQuery|null}
                 */
                this.getTarget = function () {
                    return $target;
                }
            }

            /**
             * @param {angular.IScope} scope
             * @param {jQuery} el
             * @param {$compile.directive.Attributes} attr
             * @param {UI.Menu.Controller} $uiMenu
             * @param {function} transcludeFn
             * @private
             */
            function _link(scope, el, attr, $uiMenu, transcludeFn) {
                el.addClass('ui-menu');

                transcludeFn(function (clone) {
                    var $target = clone.find('[ui-menu-target]').first();
                    if ($target.length === 0) {
                        $target = clone.children().not('ui-menu-items').first();
                    }
                    $uiMenu.setTarget($target);
                    el.replaceWith(clone);
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