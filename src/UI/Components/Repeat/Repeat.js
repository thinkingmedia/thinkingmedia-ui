(function (app) {

    /**
     * @ngdoc directive
     * @name ui.components.uiRepeat
     * @description
     *
     * Adds CSS classes for ngRepeat first, last, odd and even.
     *
     * @restrict A
     *
     * @param {string=} uiRepeat A prefix for the CSS class names (default is "ui-repeat").
     *
     * @example
     <example name="uiRepeat-directive">
         <file name="index.html">
             <div ng-repeat="item in items" ui-repeat="item">
             </div>
         </file>
     </example>
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

})(angular.module('thinkingmedia.ui.components'));