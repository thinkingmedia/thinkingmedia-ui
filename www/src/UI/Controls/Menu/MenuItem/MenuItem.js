/**
 * @ngdoc directive
 * @name ui.controls.uiMenuItem
 */
(function(app){

    app.directive('uiMenuItem',[
        function() {

            /**
             * @param {angular.IScope} scope
             * @param {jQuery} el
             * @param {$compile.directive.Attributes} attr
             * @param {ui.components.uiHeight.Controller} $uiHeight
             * @param {function} transcludeFn
             */
            function _link(scope, el, attr, $uiHeight, transcludeFn) {
                el.addClass('ui-menu-item');
                transcludeFn(function(clone){
                    el.append(clone);
                });

                if($uiHeight) {
                    $uiHeight.setHeight(el);
                }
            }

            return {
                restrict: 'E',
                require: '?^uiHeight',
                transclude: true,
                scope: {},
                link: _link
            }
        }
    ]);

})(angular.module('thinkingmedia.ui.controls'));