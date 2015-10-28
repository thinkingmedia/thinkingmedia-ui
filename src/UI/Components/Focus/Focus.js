(function (app) {

    app.directive('uiFocus', [
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
                    el.focus();
                });
            }

            return {
                restrict: 'A',
                link: _link
            }
        }]);

})(angular.module('UI'));