(function (app) {

    /**
     * Adds CSS classes for ngRepeat first, last, odd and even.
     */
    app.directive('uiRepeat', [
        function () {

            /**
             * @param {angular.IScope} scope
             * @param {Array.<Element>} el
             * @param {$compile.directive.Attributes} attr
             * @private
             */
            function _link(scope, el, attr) {
                var prefix = attr.uiRepeat || 'ui-repeat';
                _.each(['first', 'last', 'odd', 'even'], function (name) {
                    scope.$watch('$' + name, function (value) {
                        el.toggleClass(prefix + '-' + name, value);
                    });
                })
            }

            return {
                restrict: 'A',
                link: _link
            };
        }]);

})(angular.module('UI'));