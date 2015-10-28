(function (app) {

    app.directive('uiToolbar', [
        '$uiSize',
        function (/** UI.Size */$uiSize) {

            /**
             * @param {angular.IScope} scope
             * @param {Array.<Element>} el
             * @param {$compile.directive.Attributes} attr
             * @param {UI.Size.Controller} ctrl
             * @param {function} transcludeFn
             *
             * @private
             */
            function _link(scope, el, attr, ctrl, transcludeFn) {
                attr.$addClass('ui-toolbar');
                $uiSize.watchSize(scope, el);

                transcludeFn(function(cloned){
                    el.append(cloned);
                });
            }

            return {
                restrict: 'E',
                transclude: true,
                scope: {
                    'size': '@'
                },
                link: _link,
                controller: '$uiSizeController'
            }
        }]);

})(angular.module('UI'));