/**
 * @ngdoc directive
 * @name ui.layouts.uiLayout
 */
(function (app) {

    app.directive('uiLayout', [
        '$uiLayoutManager',
        '$uiModal',
        function (/** UI.LayoutManager */$uiLayoutManage,/** UI.Modal */$uiModal) {

            /**
             * @param {angular.IScope} scope
             * @param {Element[]} el
             * @param {$compile.directive.Attributes} attr
             * @private
             */
            function _link(scope, el, attr) {
                attr.$addClass('ui-layout');

                var $el = angular.element(el);

                scope.$watch('name', function (name) {
                    $el.empty();
                    if (!name) {
                        return;
                    }
                    $uiModal.appendTo($el,{
                        template: '<ui-window-stack desc="desc" no-close></ui-window-stack>',
                        controller: [
                            '$scope',
                            function($scope) {
                                var options = $uiLayoutManage.get(name);
                                $scope.desc = options.main;
                            }
                        ]
                    });
                });
            }

            return {
                restrict: 'E',
                scope: {
                    'name': '@'
                },
                link: _link
            }
        }
    ]);

})(angular.module('thinkingmedia.ui.layouts'));