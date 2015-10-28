(function (app) {

    app.directive('uiReady', [
        '$timeout',
        function ($timeout) {

            /**
             * @param {angular.IScope} scope
             * @param {Array.<Element>} el
             * @param {$compile.directive.Attributes} attr
             * @private
             */
            function _link(scope, el, attr) {
                $timeout(function(){
                    scope.$eval(attr.uiReady);
                });
            }

            return {
                restrict: 'A',
                link: _link
            }
        }]);

})(angular.module('UI'));