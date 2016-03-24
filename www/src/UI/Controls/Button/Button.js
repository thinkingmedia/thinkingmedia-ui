/**
 * @ngdoc directive
 * @name ui.controls.uiButton
 * @description
 *
 * Handles the rendering of a UI button.
 *
 * ## Size Inheritance
 *
 * Buttons, Toolbars and other UI controls can be shown using different sizes. When a uiButton is a child of uiToolbar
 * it can inherit the size setting from uiToolbar.
 *
 * @restrict E
 * @example
 <example module="ui">
 <file name="index.html">
 <ui-button>Submit</ui-button>
 </file>
 </example>
 */
(function (app) {

    app.directive('uiButton', [
        function () {
            /**
             * @param {angular.IScope} scope
             * @param {jQuery} el
             * @param {$compile.directive.Attributes} attr
             * @param {Array.<Object>} parents
             * @param {function} transcludeFn
             * @private
             */
            function _link(scope, el, attr, parents, transcludeFn) {
                var $el = angular.element(el);
                $el.addClass('ui-button');

                transcludeFn(function (cloned) {
                    $el.append(cloned);
                    var hasIcon = cloned.filter("ui-icon").length !== 0;
                    if (hasIcon) {
                        $el.addClass('has-icon');

                        // @todo - Find a better way to check if there is inner text.
                        var txt = cloned
                            .filter('span.ng-scope')
                            .addClass('ui-button-txt');
                        if (txt.length === 0) {
                            $el.addClass('icon-only');
                        }
                    }

                    if (parents[0]) {
                        parents[0].setHeight(el);
                    }

                    if (parents[1]) {
                        $el.addClass('as-menu-item');
                    }
                });
            }

            return {
                restrict: 'E',
                require: ['?^uiHeight', '?^uiMenuItem'],
                transclude: true,
                scope: {},
                link: _link
            }
        }
    ]);

})(angular.module('thinkingmedia.ui.controls'));