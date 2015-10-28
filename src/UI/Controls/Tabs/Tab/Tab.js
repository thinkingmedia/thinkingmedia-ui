/**
 * @namespace UI.Tab
 */
(function (app) {

    app.directive('uiTab', [
        '$log',
        '$uiWindows',
        function ($log, /** UI.Windows */$uiWindows) {

            /**
             * @name UI.Tab.Scope
             *
             * @property {number} windowId
             * @property {string} title
             * @property {boolean} active
             */

            /**
             * @name UI.Tab.Controller
             * @param {UI.Tab.Scope} $scope
             */
            function controller($scope) {

                /**
                 * @returns {boolean}
                 */
                this.isActive = function() {
                    return $scope.active;
                };

                /**
                 * @param {string} title
                 */
                this.setTitle = function (title) {
                    $scope.title = title;
                };

                /**
                 * @returns {string}
                 */
                this.getTitle = function () {
                    return $scope.title;
                }
            }

            /**
             * @param {UI.Tab.Scope} scope
             * @param {Array.<Element>} el
             * @param {$compile.directive.Attributes} attr
             * @param {UI.Tabs.Controller} tabs
             * @private
             */
            function _link(scope, el, attr, tabs) {
                attr.$addClass('ui-tab');

                scope.$watch('windowId', function (value) {
                    var options = $uiWindows.get(~~value);
                    scope.title = options.title;
                    var parent = angular.element(el).empty();
                    $uiWindows.create(parent, options.$id);
                });
            }

            return {
                restrict: 'E',
                require: '^uiTabs',
                scope: {
                    'windowId': '@',
                    'active': '@',
                    'title': '='
                },
                link: _link,
                controller: [
                    '$scope',
                    controller
                ],
                controllerAs: '$uiTab'
            }
        }
    ]);

})(angular.module('UI'));