(function (app) {

    /**
     * @ngdoc directive
     * @name ui.controls.uiButton
     * @description
     *
     * A button control.
     *
     * @restrict E
     */
    app.directive('uiButton', [
        '$uiSize',
        function (/** UI.Size */$uiSize) {

            /**
             * @param {angular.IScope} scope
             * @param {Array.<Element>} el
             * @param {$compile.directive.Attributes} attr
             * @param {Array.<Object>} parents
             * @param {function} transcludeFn
             * @private
             */
            function _link(scope, el, attr, parents, transcludeFn) {
                attr.$addClass('ui-button');

                var $el = angular.element(el);
                transcludeFn(function (cloned) {
                    $el.append(cloned);
                    var hasIcon = cloned.filter("ui-icon").length !== 0;
                    if (hasIcon) {
                        attr.$addClass('has-icon');
                        if (cloned.filter('.ui-button-txt').length === 0) {
                            attr.$addClass('icon-only');
                        }
                    }

                    if(!!parents[1])
                    {
                        attr.$addClass('as-menu-item');
                    }

                    $uiSize.watchSize(scope, el, parents);
                });
            }

            return {
                restrict: 'E',
                require: ['?^uiToolbar','?^uiMenuItem'],
                transclude: true,
                scope: {
                    size: '@'
                },
                link: _link,
                controller: '$uiSizeController'
            }
        }]);

})(angular.module('thinkingmedia.ui.controls'));