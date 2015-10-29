(function (app) {

    /**
     * @ngdoc directive
     * @name ui.components.uiRepeat
     * @description
     *
     * Place this attribute directive on any element that has an `ng-repeat` on it, and it will add CSS classes
     * for the different element states in the repeat set.
     *
     * # Example
     *
     * - **ui-repeat-first** is added when **$first** is true.
     * - **ui-repeat-last** is added when **$last** is true.
     * - **ui-repeat-odd** is added when **$odd** is true.
     * - **ui-repeat-even** is added when **$even** is true.
     *
     * # Prefix Name
     *
     * By default, the string **"ui-repeat"** is prefixed before the different CSS classes, but you can change this
     * string value by assigning a value to the `ui-repeat` attribute.
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