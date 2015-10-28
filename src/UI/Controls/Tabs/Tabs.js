/**
 * @namespace UI.Tabs
 */
(function (app) {

    app.directive('uiTabs', [
        '$log',
        '$uiWindows',
        function ($log, /** UI.Windows */$uiWindows) {

            /**
             * @name UI.Tabs.Scope
             *
             * @property {Array.<UI.Tabs.Tab>} tabs
             * @property {{active:number,showNav:boolean,maxWidth:number}} model
             * @property {Array.<UI.Windows.Options>} windows
             * @property {UI.DescTabs} desc
             */

            /**
             * @name UI.Tabs.Tab
             *
             * @param {number} id
             *
             * @constructor
             */
            var Tab = function (id) {
                this.options = $uiWindows.get(id);
                this.width = 0;
                this.visible = true;
                this.title = 'loading...';
            };

            /**
             * @name UI.Tabs.Controller
             *
             * @param {UI.Tabs.Scope} $scope
             */
            function controller($scope) {
                $scope.tabs = [];

                if($scope.desc) {
                    $scope.tabs = _.map($scope.desc.toArray(),function(id){
                        return new Tab(id);
                    });
                }

                $scope.windows = $uiWindows.getOptions();

                $scope.model = {};
                $scope.model.active = 0;
                $scope.model.showNav = false;

                /**
                 * @param {number} id
                 */
                this.add = function (id) {
                    $log.debug('$uiTabs::add ' + id);
                    $scope.tabs.push(new Tab(id));
                    $scope.model.active = $scope.tabs.length - 1;
                };

                this.next = function () {
                    $log.debug('$uiTabs::next');
                    if ($scope.model.active < $scope.tabs.length - 1) {
                        $scope.model.active++;
                    }
                };

                this.prev = function () {
                    $log.debug('$uiTabs::prev');
                    if ($scope.model.active > 0) {
                        $scope.model.active--;
                    }
                };

                this.remove = function (indx) {
                    $log.debug('$uiTabs::remove');
                    //$scope.active = $scope.active == 0 ? 0 : $scope.active - 1;
                };

                this.updateNav = function () {
                    var sum = 0;
                    var count = 0;
                    _.each($scope.tabs, function (tab) {
                        sum += tab.width;
                        tab.visible = sum < $scope.model.maxWidth;
                        if (tab.visible) {
                            count++;
                        }
                    });
                    $scope.model.showNav = count != $scope.tabs.length;
                }
            }

            /**
             * @param {UI.Tabs.Scope} scope
             * @param {Array.<Element>} el
             * @param {$compile.directive.Attributes} attr
             * @param {UI.Tabs.Controller} $uiTabs
             * @private
             */
            function _link(scope, el, attr, $uiTabs) {
                attr.$addClass('ui-tabs');

                scope.$watch('model.maxWidth', function () {
                    $uiTabs.updateNav();
                });
                scope.$watchCollection('tabs', function () {
                    $uiTabs.updateNav();
                })
            }

            return {
                restrict: 'E',
                transclude: true,
                scope: {
                    'desc': '='
                },
                link: _link,
                controller: [
                    '$scope',
                    controller
                ],
                controllerAs: '$uiTabs',
                templateUrl: '/src/UI/Controls/Tabs/Tabs.html'
            }
        }
    ]);

})(angular.module('UI'));