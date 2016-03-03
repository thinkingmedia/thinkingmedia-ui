(function (app) {

    /**
     * @ngdoc directive
     * @name ui.components.uiSize
     * @description
     *
     * Executes the expression when the size of an element has been changed.
     *
     * # How It Works
     *
     * uiSize uses the uiLayout service to watch for changes in the size of the element the directive is assigned to.
     * When a change is detected the expression is executed with variables that hold the current size.
     *
     * # Expression Variables
     *
     * - **$width** the width of the element.
     * - **$height** the height of the element.
     * - **$innerWidth** the inner width of the element.
     * - **$innerHeight** the inner height of the element.
     * - **$outerWidth** the outer width of the element.
     * - **$outerHeight** the outer height of the element.
     *
     * @param {expression} uiSize The expression to execute.
     *
     * @restrict A
     */
    app.directive('uiSize', [
        'uiLayout',
        function (/** UI.uiLayout*/uiLayout) {

            /**
             * @param {angular.IScope} scope
             * @param {Array.<Element>} el
             * @param {$compile.directive.Attributes} attr
             * @private
             */
            function _link(scope, el, attr) {
                var $el = angular.element(el);
                uiLayout.watch(scope, el, function () {
                    if ($el.hasClass('ng-hide')) {
                        return;
                    }
                    var values = {
                        '$width': $el.width(),
                        '$innerWidth': $el.innerWidth(),
                        '$outerWidth': $el.outerWidth(true),
                        '$height': $el.height(),
                        '$innerHeight': $el.innerHeight(),
                        '$outerHeight': $el.outerHeight(true)
                    };
                    scope.$eval(attr.uiSize, values);
                });
                uiLayout.redraw();
            }

            return {
                restrict: 'A',
                link: _link
            };
        }]);

})(angular.module('thinkingmedia.ui.components'));