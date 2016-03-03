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
             * @param {function} ctrl
             * @param {function} transcludeFn
             */
            function _link(scope, el, attr, ctrl, transcludeFn) {
                el.addClass('ui-menu-item');
                transcludeFn(function(clone){
                    el.append(clone);
                });
            }

            return {
                restrict: 'E',
                transclude: true,
                scope: {},
                link: _link
            }
        }
    ]);

})(angular.module('thinkingmedia.ui.controls'));