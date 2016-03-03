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
        function (/** UI.Events */$events, /** angular.IDocumentService */$document) {

            /**
             * @name ui.controls.uiMenuItems.Scope
             * @extends angular.IScope
             *
             * @property {string} show
             */

            /**
             * @param {ui.controls.uiMenuItems.Scope} scope
             * @param {jQuery} el
             * @param {$compile.directive.Attributes} attr
             * @param {ui.controls.uiMenu.Controller} $uiMenu
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

                    // there is no clickable target. Keep menu embedded and visible.
                    if($target === null) {
                        el.addClass('embedded');
                        scope.show = 'true';
                        return;
                    }
                    el.addClass('popup');

                    $events.bind(scope, $target, 'click', function (/** Event */event) {
                        event.stopPropagation();
                        el.removeClass('ng-hide');
                        $events.once(scope, $document, 'click', function () {
                            el.addClass('ng-hide');
                        });

                        var pos = $target.position();

                        pos.top -= 8;
                        pos.left -= 16;

                        el.css({
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
                link: _link
            }
        }
    ]);

})(angular.module('thinkingmedia.ui.controls'));