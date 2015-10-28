/**
 * @namespace UI.MenuItem
 */
(function(app){

    app.directive('uiMenuItem',[
        function() {

            /**
             * @name UI.MenuItem.Controller
             *
             * @param {angular.IScope} $scope
             */
            function controller($scope) {

            }

            /**
             * @param {angular.IScope} scope
             * @param {Array.<Element>} el
             * @param {$compile.directive.Attributes} attr
             * @param {UI.MenuItem.Controller} ctrl
             * @param {function} transcludeFn
             * @private
             */
            function _link(scope, el, attr, ctrl, transcludeFn) {
                attr.$addClass('ui-menu-item');

                var $el = angular.element(el);

                transcludeFn(function(clone){
                    $el.append(clone);
                });
            }

            return {
                restrict: 'E',
                transclude: true,
                scope: {},
                link: _link,
                controller: [
                    '$scope',
                    controller
                ],
                controllerAs: '$uiMenuItem'
            }
        }
    ]);

})(angular.module('UI'));