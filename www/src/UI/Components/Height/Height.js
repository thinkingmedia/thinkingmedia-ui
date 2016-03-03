(function (app) {

    /**
     * @ngdoc directive
     * @name ui.components.uiHeight
     * @description
     *
     * Controls the height of a control and it's children. Controls like uiButton, uiIcon and uiMenu will inherit their
     * height from parents that have this directive. Those controls require the controller of this directive, and use
     * that reference to set a CSS style of what their height should be.
     *
     * # How It Works
     *
     * The directive assigns a CSS class named `ui-height-###` where `###` can be either `xsm`, `sm`, `md`,
     * `lg` or `xlg`. Each size is a step of `4px` in size.
     *
     * While this directive is called height. It refers to the `line-height` style of the control. It does not mean that
     * the control will fit that height exactly, but indicates that the control should be styled according to that height
     * preference.
     *
     * This allows you to set a `uiToolBar` to be `ui-height="sm"` for small child buttons.
     *
     * # Default Height
     *
     * The default height for controls is `md`.
     *
     * @param {string} uiSize The height preset to use.
     *
     * @restrict A
     */
    app.directive('uiHeight', [
        function () {

            /**
             * @name ui.components.uiHeight.Controller
             *
             * @param {Array.<Element>} $element
             * @param {$compile.directive.Attributes} $attr
             */
            function controller($element, $attr) {

                var DEFAULT_SZIE = 'md';

                /**
                 * @param {Array.<Element>|Element|jQuery} el
                 */
                this.setHeight = function (el) {
                    var $el = angular.element(el);
                    $el.addClass('ui-height-' + this.getHeight());
                };

                /**
                 * @returns {string}
                 */
                this.getHeight = function () {
                    return $attr['uiHeight'] || DEFAULT_SZIE;
                };

                /**
                 * @return {string}
                 */
                this.getParentHeight = function () {
                    var $parent = angular.element($element).closest('.ui-has-height');
                    if($parent.length === 0) {
                        return DEFAULT_SZIE;
                    }
                    if($parent.hasClass('ui-height-xsm')) {
                        return 'xsm';
                    }
                    if($parent.hasClass('ui-height-sm')) {
                        return 'sm';
                    }
                    if($parent.hasClass('ui-height-md')) {
                        return 'md';
                    }
                    if($parent.hasClass('ui-height-lg')) {
                        return 'lg';
                    }
                    if($parent.hasClass('ui-height-xlg')) {
                        return 'xlg';
                    }
                    return DEFAULT_SZIE;
                };
            }

            /**
             * @param {angular.IScope} scope
             * @param {Array.<Element>} el
             * @param {$compile.directive.Attributes} attr
             * @param {ui.components.uiHeight.Controller} $uiHeight
             */
            function _link(scope, el, attr, $uiHeight) {
                var $el = angular.element(el);
                $el.addClass('ui-has-height');
                $uiHeight.setHeight(el);
            }

            return {
                restrict: 'A',
                link: _link,
                controller: [
                    '$element',
                    '$attrs',
                    controller
                ]
            };
        }]);

})(angular.module('thinkingmedia.ui.components'));