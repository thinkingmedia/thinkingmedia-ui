/**
 * @ngdoc directive
 * @name ui.layouts.uiBorder
 */
(function (app) {

    /**
     * @name UI.Border
     *
     * @param {UI.uiLayout} uiLayout
     */
    function BorderDirective(uiLayout) {
        /**
         * @name UI.Border.Controller
         */
        function controller() {
            /**
             * @type {{top: number, left: number, right: number, bottom: number}}
             */
            var _border = {
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            };

            this.getSize = function () {
                return _border;
            };

            this.setLeft = function (size) {
                _border.left = ~~size;
            };

            this.setRight = function (size) {
                _border.right = ~~size;
            };

            this.setTop = function (size) {
                _border.top = ~~size;
            };

            this.setBottom = function (size) {
                _border.bottom = ~~size;
            };
        }

        /**
         * @param {.IScope} scope
         * @param {Array.<Element>} el
         * @param {$compile.directive.Attributes} attr
         * @param {UI.Border.Controller} $uiBorder
         * @private
         */
        function _link(scope, el, attr, $uiBorder) {
            attr.$addClass('ui-border-layout');
            uiLayout.redraw();
        }

        return {
            restrict: 'EA',
            link: _link,
            controller: [
                controller
            ],
            controllerAs: '$uiBorder'
        };
    }

    app.directive('uiBorder', [
        'uiLayout',
        BorderDirective
    ]);

    /**
     * @ngdoc directive
     * @name ui.layouts.uiLeft
     */
    app.directive('uiLeft', [
        'uiLayout',
        function (/**UI.uiLayout*/uiLayout) {
            return {
                restrict: 'EA',
                require: '^^uiBorder',
                link: function (scope, el, attr, $uiBorder) {
                    attr.$addClass('ui-left');
                    scope.$watchCollection($uiBorder.getSize, function (size) {
                        el.css({
                            top: size.top,
                            bottom: size.bottom
                        })
                    });
                    uiLayout.watchOuterWidth(scope, el, function (value) {
                        $uiBorder.setLeft(el.hasClass('ng-hide') ? 0 : value);
                    });
                    scope.$on('$destroy', function () {
                        $uiBorder.setLeft(0);
                    });
                    uiLayout.redraw();
                }
            }
        }
    ]);

    /**
     * @ngdoc directive
     * @name ui.layouts.uiRight
     */
    app.directive('uiRight', [
        'uiLayout',
        function (/**UI.uiLayout*/uiLayout) {
            return {
                restrict: 'EA',
                require: '^^uiBorder',
                link: function (scope, el, attr, $uiBorder) {
                    attr.$addClass('ui-right');
                    scope.$watchCollection($uiBorder.getSize, function (size) {
                        el.css({
                            top: size.top,
                            bottom: size.bottom
                        })
                    });
                    uiLayout.watchOuterWidth(scope, el, function (value) {
                        $uiBorder.setRight(el.hasClass('ng-hide') ? 0 : value);
                    });
                    scope.$on('$destroy', function () {
                        $uiBorder.setRight(0);
                    });
                    uiLayout.redraw();
                }
            }
        }
    ]);

    /**
     * @ngdoc directive
     * @name ui.layouts.uiTop
     */
    app.directive('uiTop', [
        'uiLayout',
        function (/**UI.uiLayout*/uiLayout) {
            return {
                restrict: 'EA',
                require: '^^uiBorder',
                link: function (scope, el, attr, $uiBorder) {
                    attr.$addClass('ui-top');
                    uiLayout.watchOuterHeight(scope, el, function (value) {
                        $uiBorder.setTop(el.hasClass('ng-hide') ? 0 : value);
                    });
                    scope.$on('$destroy', function () {
                        $uiBorder.setTop(0);
                    });
                    uiLayout.redraw();
                }
            }
        }
    ]);

    /**
     * @ngdoc directive
     * @name ui.layouts.uiBottom
     */
    app.directive('uiBottom', [
        'uiLayout',
        function (/**UI.uiLayout*/uiLayout) {
            return {
                restrict: 'EA',
                require: '^^uiBorder',
                link: function (scope, el, attr, $uiBorder) {
                    attr.$addClass('ui-bottom');
                    uiLayout.watchOuterHeight(scope, el, function (value) {
                        $uiBorder.setBottom(el.hasClass('ng-hide') ? 0 : value);
                    });
                    scope.$on('$destroy', function () {
                        $uiBorder.setBottom(0);
                    });
                    uiLayout.redraw();
                }
            }
        }
    ]);

    /**
     * @ngdoc directive
     * @name ui.layouts.uiCenter
     */
    app.directive('uiCenter', [
        'uiLayout',
        function (/**UI.uiLayout*/uiLayout) {
            return {
                restrict: 'EA',
                require: '^^uiBorder',
                link: function (scope, el, attr, $uiBorder) {
                    attr.$addClass('ui-center');
                    scope.$watchCollection($uiBorder.getSize, function (size) {
                        el.css({
                            top: size.top,
                            left: size.left,
                            right: size.right,
                            bottom: size.bottom
                        })
                    });
                    uiLayout.redraw();
                }
            }
        }
    ]);

})(angular.module('thinkingmedia.ui.layouts'));