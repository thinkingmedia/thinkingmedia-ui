(function (app) {

    app.directive('uiIcon', [
        '$uiSize',
        function (/** UI.Size */$uiSize) {

            /**
             * @param {angular.IScope} scope
             * @param {Array.<Element>} el
             * @param {$compile.directive.Attributes} attr
             * @param {Array.<Object>} parents
             * @private
             */
            function _link(scope, el, attr, parents) {
                attr.$addClass('ui-icon');
                attr.$addClass('material-icons');
                $uiSize.watchSize(scope, el, parents);
                scope.$watch('name', function (value) {
                    $(el).text(value);
                });
                scope.$watch('size',function(value){
                    var parent_size = $uiSize.getParentSize(parents);
                    if(parent_size === 'md' && value === 'sm') {
                        attr.$addClass('ui-fit-md');
                    }
                });
            }

            return {
                restrict: 'E',
                require: ['?^uiButton', '?^uiToolbar'],
                scope: {
                    name: '@',
                    size: '@'
                },
                link: _link,
                controller: '$uiSizeController'
            }
        }]);

})(angular.module('UI'));