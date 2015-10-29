/**
 * @ngdoc directive
 * @name ui.controls.uiDebug
 */
(function (app) {

    /**
     * @param {$assert} $assert
     * @param {angular.ILogService} $log
     * @param {UI.uiDebugService} uiDebugService
     *
     * @constructor
     */
    function uiDebugDirective($assert, $log, uiDebugService) {

        /**
         * @name UI.uiDebug.Scope
         * @extends angular.IScope
         *
         * @property {UI.uiDebug.Controller} $uiDebug
         */

        /**
         * @name UI.uiDebug.Controller
         *
         * @param {UI.uiDebug.Scope} $scope
         *
         * @constructor
         */
        function uiDebug($scope) {
        }

        /**
         * @param {UI.uiDebug.Scope} scope
         * @param {Element[]} el
         * @param {$compile.directive.Attributes} attr
         * @param {UI.uiDebug.Controller} $uiDebug
         * @param {function} transcludeFn
         **/
        function _link(scope, el, attr, $uiDebug, transcludeFn) {
            attr.$addClass('ui-debug');

            el.hide();

            // skip transclude if debug disabled
            transcludeFn(function(cloned) {
                if(uiDebugService.isEnabled()){
                    el.append(cloned);
                }
            });

            scope.$watch(function() {
                return uiDebugService.getDebug();
            },function(value) {
                if(value) {
                    el.show();
                } else {
                    el.hide();
                }
            });
        }

        return {
            restrict: 'E',
            transclude: true,
            scope: {},
            link: _link,
            controller: [
                '$scope',
                uiDebug
            ],
            controllerAs: '$uiDebug'
        }

    }

    app.directive('uiDebug', [
        '$assert',
        '$log',
        'uiDebugService',
        uiDebugDirective
    ]);

})(angular.module('thinkingmedia.ui.controls'));