/**
 * @ngdoc directive
 * @name ui.controls.uiToolbarInput
 */
(function (app) {

    app.directive('uiToolbarInput', [
        '$log',
        function ($log) {

            /**
             * @name UI.ToolbarInput.Scope
             */

            /**
             * @name UI.ToolbarInput.Controller
             * @param {UI.ToolbarInput.Scope} $scope
             */
            function controller($scope) {
            }

            /**
             * @param {UI.ToolbarInput.Scope} scope
             * @param {Array.<Element>} el
             * @param {$compile.directive.Attributes} attr
             * @param {UI.ToolbarInput.Controller} $uiToolbarInput
             * @private
             */
            function _link(scope, el, attr, $uiToolbarInput) {
                attr.$addClass('ui-toolbar-input');
            }

            return {
                restrict: 'E',
                scope: {
                    'name': '@',
                    'model': '='
                },
                link: _link,
                controller: [
                    '$scope',
                    controller
                ],
                controllerAs: '$uiToolbarInput',
                templateUrl: '/src/UI/Controls/Toolbar/ToolbarInput/ToolbarInput.html'
            }
        }
    ]);

})(angular.module('UI'));