/**
 * @namespace UI.ToolTip
 */
(function (app) {

    app.directive('uiTooltip', [
        '$compile',
        '$templateRequest',
        '$rootScope',
        '$timeout',
        '$uiEvents',
        function ($compile, $templateRequest, $rootScope, $timeout, /** UI.Events */$uiEvents) {

            // pre-load the template
            var tScope = $rootScope.$new(true);
            $templateRequest('/src/UI/Controls/ToolTip/ToolTip.html')
                .then(function (template) {
                    var popup = $compile(angular.element(template))(tScope, function (cloned) {
                        angular.element('body').append(cloned);
                    });
                    tScope.$watch('show', function (value) {
                        if (!value) {
                            tScope.style = {};
                            return;
                        }
                        var tip = popup[0].getBoundingClientRect();
                        var left = ((tScope.rect.left + (tScope.rect.width / 2)) - (tip.width / 2));
                        var top = tScope.rect.top + tScope.rect.height;
                        tScope.style = {
                            left: left + 'px',
                            top: top + 'px'
                        }
                    });
                });

            /**
             * @param {angular.IScope} scope
             * @param {Array.<Element>} el
             * @param {$compile.directive.Attributes} attr
             * @private
             */
            function _link(scope, el, attr) {
                var $el = angular.element(el);
                var timer = null;
                function cancel() {
                    timer && $timeout.cancel(timer);
                    timer = null;
                    $uiEvents.apply($rootScope,function(){
                        tScope.show = false;
                    });
                }
                $el.bind('mouseenter', function () {
                    timer = $timeout(function () {
                        tScope.$apply(function () {
                            tScope.show = !attr.disabled;
                            tScope.message = attr.uiTooltip;
                            tScope.rect = el[0].getBoundingClientRect();
                        });
                    }, 500);
                });
                attr.$observe('disabled',function(value) {
                    if(!!value) {
                        cancel();
                    }
                });
                $el.bind('mouseleave', function () {
                    cancel();
                });
                scope.$on('$destroy', function () {
                    cancel();
                });
            }

            return {
                restrict: 'A',
                link: _link
            }
        }
    ]);

})(angular.module('UI'));