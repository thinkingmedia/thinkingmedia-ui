/**
 * @ngdoc directive
 * @name ui.controls.uiMenuItems
 */
(function (app) {

    /**
     * @name UI.MenuItems
     */
    app.directive('uiMenuItems', [
        '$uiEvents',
        '$document',
        function (/** UI.Events */$events, /** ng.IDocumentService */$document) {

            /**
             * @name UI.MenuItems.Scope
             * @extends angular.IScope
             *
             * @property {string} show
             */

            /**
             * @name UI.MenuItems.Controller
             *
             * @param {UI.MenuItems.Scope} $scope
             */
            function controller($scope) {
            }

            /**
             * @param {UI.MenuItems.Scope} scope
             * @param {Array.<Element>} el
             * @param {$compile.directive.Attributes} attr
             * @param {UI.Menu.Controller} $uiMenu
             * @param {function} transcludeFn
             *
             * @private
             */
            function _link(scope, el, attr, $uiMenu, transcludeFn) {
                el.addClass('ui-menu-items ng-hide');

                scope.$watch('show', function (value) {
                    if(value === 'true') {
                        el.removeClass('ng-hide');
                        return;
                    }
                    el.addClass('ng-hide');
                });

                transcludeFn(function (clone) {
                    el.append(clone);

                    var $target = $uiMenu.getTarget();
                    if($target === null) {
                        el.addClass('embedded');
                        return;
                    }

                    $events.bind(scope, $target, 'click', function (/** Event */event) {
                        event.stopPropagation();
                        el.removeClass('ng-hide');
                        $events.once(scope, $document, 'click', function (event) {
                            el.addClass('ng-hide');
                        });

                        var pos = $target.position();

                        pos.top -= 8;
                        pos.left -= 16;

                        $el.css({
                            top: pos.top + 'px',
                            left: pos.left + 'px'
                        });
                    });
                });
            }

            return {
                restrict: 'E',
                require: '^uiMenu',
                transclude: true,
                scope: {
                    show: '@'
                },
                link: _link,
                controller: [
                    '$scope',
                    controller
                ],
                controllerAs: '$uiMenuItems'
            }
        }
    ]);

})(angular.module('thinkingmedia.ui.controls'));