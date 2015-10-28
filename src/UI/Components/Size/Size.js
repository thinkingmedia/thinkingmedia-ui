(function (app) {

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
                uiLayout.watch(scope, el, function () {
                    if (el.hasClass('ng-hide')) {
                        return;
                    }
                    var values = {
                        '$width': el.width(),
                        '$innerWidth': el.innerWidth(),
                        '$outerWidth': el.outerWidth(true),
                        '$height': el.height(),
                        '$innerHeight': el.innerHeight(),
                        '$outerHeight': el.outerHeight(true)
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

})(angular.module('UI'));