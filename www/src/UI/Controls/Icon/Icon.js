/**
 * @ngdoc directive
 * @name ui.controls.uiIcon
 * @description
 *
 * uiIcon is used to render font icons. When uiIcon is placed inside a uiButton or uiToolbar it adjusts it's size to
 * match it's parent size.
 *
 * @param {string} name The name of the font icon.
 *
 * @restrict E
 * @example
 <example module="ui">
 <file name="index.html">
 <ui-icon name="fa-home"></ui-icon>
 </file>
 </example>
 */
(function (app) {

    app.directive('uiIcon', [
        '$uiSize',
        function (/** UI.Size */$uiSize) {

            /**
             * @param {angular.IScope} scope
             * @param {jQuery} el
             * @param {$compile.directive.Attributes} attr
             * @param {ui.components.uiHeight.Controller} $uiHeight
             */
            function _link(scope, el, attr, $uiHeight) {
                el.addClass('ui-icon');
                scope.$watch('name', function (value) {
                    // using font-awesome
                    if (_.startsWith(value, 'fa-')) {
                        el.addClass('fa');
                        el.addClass(value);
                        return;
                    }
                    // using Material Icons
                    el.addClass('material-icons');
                    el.text(value);
                });

                $uiHeight.setHeight(el);

                if($uiHeight.getHeight() === 'sd' && $uiHeight.getParentHeight() === 'md') {
                    el.addClass('ui-fit-md');
                }
            }

            return {
                restrict: 'E',
                require: '?^uiHeight',
                scope: {
                    name: '@'
                },
                link: _link,
                controller: '$uiSizeController'
            }
        }]);

})(angular.module('thinkingmedia.ui.controls'));