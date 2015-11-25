/**
 * @ngdoc directive
 * @name ui.controls.uiMenu
 */
(function (app) {

    /**
     * @name UI.Menu
     */
    app.directive('uiMenu', [
        function () {

            /**
             * @name UI.Menu.Controller
             *
             * @param {angular.IScope} $scope
             */
            function controller($scope) {
                var $target = null;
                /**
                 * @param {angular.IAugmentedJQuery} el
                 */
                this.setTarget = function (el) {
                    $target = el.length === 0
                        ? null : el;
                };
                /**
                 * @returns {ng.IAugmentedJQuery}
                 */
                this.getTarget = function () {
                    return $target;
                }
            }

            /**
             * @param {angular.IScope} scope
             * @param {Array.<Element>} el
             * @param {$compile.directive.Attributes} attr
             * @param {UI.Menu.Controller} $uiMenu
             * @param {function} transcludeFn
             * @private
             */
            function _link(scope, el, attr, $uiMenu, transcludeFn) {
                attr.$addClass('ui-menu');

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
                    'embedded': '@'
                },
                link: _link,
                controller: [
                    '$scope',
                    controller
                ],
                controllerAs: '$uiMenu'
            }
        }
    ]);

})(angular.module('thinkingmedia.ui.controls'));