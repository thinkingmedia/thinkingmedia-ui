/**
 * @ngdoc service
 * @name rfx.rest
 * @description
 * # rest
 * Service to talk with backend api.
 */
(function(app){


    /**
     * @ngdoc directive
     * @name rfx.directive:rAutogrow
     * @element textarea
     * @function
     *
     * @description
     * Resize textarea automatically to the size of its text content.
     *
     * @example
     <example module="rfx">
     <file name="index.html">
     <textarea ng-model="text" r-autogrow class="input-block-level"></textarea>
     <pre>{{text}}</pre>
     </file>
     </example>
     */

    function UI() {

    }

    /**
     * @ngdoc
     * @name rfx.rest#get
     * @methodOf rfx.rest
     *
     * @description
     * Method to get data form the backend api
     * @example
     * rest.get(id);
     * @param {int} entity id
     * @returns {httpPromise} resolve with fetched data, or fails with error description.
     */    app.run([
        UI
    ]);

})(angular.module('UI',[
    'ngAssert'
]));
(function (app) {

    app.directive('uiLayout', [
        '$uiLayoutManager',
        '$uiModal',
        function (/** UI.LayoutManager */$uiLayoutManage,/** UI.Modal */$uiModal) {

            /**
             * @param {angular.IScope} scope
             * @param {Element[]} el
             * @param {$compile.directive.Attributes} attr
             * @private
             */
            function _link(scope, el, attr) {
                attr.$addClass('ui-layout');

                var $el = angular.element(el);

                scope.$watch('name', function (name) {
                    $el.empty();
                    if (!name) {
                        return;
                    }
                    $uiModal.appendTo($el,{
                        template: '<ui-window-stack desc="desc" no-close></ui-window-stack>',
                        controller: [
                            '$scope',
                            function($scope) {
                                var options = $uiLayoutManage.get(name);
                                $scope.desc = options.main;
                            }
                        ]
                    });
                });
            }

            return {
                restrict: 'E',
                scope: {
                    'name': '@'
                },
                link: _link
            }
        }
    ]);

})(angular.module('UI'));
(function (app) {

    app.provider('d3', [
        function () {
            this.$get = [
                '$window',
                function ($window) {
                    return $window.d3;
                }]
        }
    ]);

})(angular.module('UI'));
/**
 * @ngdoc directive
 * @name UI.uiDelayHover
 * @description
 * Executes the expression after hovering for 500ms or the value of ui-delay-time attribute.
 */
(function (app) {

    /**
     * @param {angular.ITimeoutService} $timeout
     * @constructor
     */
    function uiDelayHoverDirective($timeout) {

        /**
         * @param {angular.IScope}  scope
         * @param {Element[]} el
         * @param {$compile.directive.Attributes} attr
         **/
        function _link(scope, el, attr) {
            attr.$addClass('ui-delay-hover');

            var cancel = null;

            el.bind('mouseenter', function () {
                cancel = $timeout(function () {
                    scope.$eval(attr.uiDelayHover, {$hover: true});
                }, ~~(attr.uiDelayTime || 500));
            });

            // @todo - need a hide expression
            el.bind('mouseleave', function () {
                cancel && $timeout.cancel(cancel);
                scope.$eval(attr.uiDelayHover, {$hover: false});
            });

            scope.$on('$destroy', function () {
                cancel && $timeout.cancel(cancel);
                scope.$eval(attr.uiDelayHover, {$hover: false});
            });
        }

        return {
            restrict: 'A',
            link: _link
        }
    }

    app.directive('uiDelayHover', [
        '$timeout',
        uiDelayHoverDirective
    ]);

})(angular.module('UI'));
(function (app) {

    app.directive('uiFocus', [
        '$timeout',
        function ($timeout) {

            /**
             * @param {angular.IScope} scope
             * @param {Array.<Element>} el
             * @param {$compile.directive.Attributes} attr
             * @private
             */
            function _link(scope, el, attr) {
                $timeout(function(){
                    el.focus();
                });
            }

            return {
                restrict: 'A',
                link: _link
            }
        }]);

})(angular.module('UI'));
(function (app) {

    app.directive('uiReady', [
        '$timeout',
        function ($timeout) {

            /**
             * @param {angular.IScope} scope
             * @param {Array.<Element>} el
             * @param {$compile.directive.Attributes} attr
             * @private
             */
            function _link(scope, el, attr) {
                $timeout(function(){
                    scope.$eval(attr.uiReady);
                });
            }

            return {
                restrict: 'A',
                link: _link
            }
        }]);

})(angular.module('UI'));
(function (app) {

    /**
     * Adds CSS classes for ngRepeat first, last, odd and even.
     */
    app.directive('uiRepeat', [
        function () {

            /**
             * @param {angular.IScope} scope
             * @param {Array.<Element>} el
             * @param {$compile.directive.Attributes} attr
             * @private
             */
            function _link(scope, el, attr) {
                var prefix = attr.uiRepeat || 'ui-repeat';
                _.each(['first', 'last', 'odd', 'even'], function (name) {
                    scope.$watch('$' + name, function (value) {
                        el.toggleClass(prefix + '-' + name, value);
                    });
                })
            }

            return {
                restrict: 'A',
                link: _link
            };
        }]);

})(angular.module('UI'));
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
(function (app) {

    app.directive('uiWheel', [
        '$parse',
        function ($parse) {
            return {
                restrict: 'A',
                link: function (scope, element, attr) {

                    var expr = $parse(attr['uiWheel']),
                        fn = function (event, delta, deltaX, deltaY) {
                            scope.$apply(function () {
                                expr(scope, {
                                    $event: event,
                                    $delta: delta,
                                    $deltaX: deltaX,
                                    $deltaY: deltaY
                                });
                            });
                        },
                        hamster;

                    if (typeof Hamster === 'undefined') {
                        // fallback to standard wheel event
                        element.bind('wheel', function (event) {
                            scope.$apply(function () {
                                expr(scope, {
                                    $event: event
                                });
                            });
                        });
                        return;
                    }

                    // don't create multiple Hamster instances per element
                    if (!(hamster = element.data('hamster'))) {
                        hamster = Hamster(element[0]);
                        element.data('hamster', hamster);
                    }

                    // bind Hamster wheel event
                    hamster.wheel(fn);

                    // unbind Hamster wheel event
                    scope.$on('$destroy', function () {
                        hamster.unwheel(fn);
                    });
                }
            }
        }]);

})(angular.module('UI'));
(function (app) {

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

})(angular.module('UI'));
(function (app) {

    /**
     * @name UI.uiDebug
     *
     * @param {$assert} $assert
     * @param {angular.ILogService} $log
     * @param {UI.uiDebugService} uiDebugService
     *
     * @constructor
     */
    function uiDebugDirective($assert, $log, uiDebugService) {

        /**
         * @name UI.uiDebug.Scope
         * @extends angular.IScope
         *
         * @property {UI.uiDebug.Controller} $uiDebug
         */

        /**
         * @name UI.uiDebug.Controller
         *
         * @param {UI.uiDebug.Scope} $scope
         *
         * @constructor
         */
        function uiDebug($scope) {
        }

        /**
         * @param {UI.uiDebug.Scope} scope
         * @param {Element[]} el
         * @param {$compile.directive.Attributes} attr
         * @param {UI.uiDebug.Controller} $uiDebug
         * @param {function} transcludeFn
         **/
        function _link(scope, el, attr, $uiDebug, transcludeFn) {
            attr.$addClass('ui-debug');

            el.hide();

            // skip transclude if debug disabled
            transcludeFn(function(cloned) {
                if(uiDebugService.isEnabled()){
                    el.append(cloned);
                }
            });

            scope.$watch(function() {
                return uiDebugService.getDebug();
            },function(value) {
                if(value) {
                    el.show();
                } else {
                    el.hide();
                }
            });
        }

        return {
            restrict: 'E',
            transclude: true,
            scope: {},
            link: _link,
            controller: [
                '$scope',
                uiDebug
            ],
            controllerAs: '$uiDebug'
        }

    }

    app.directive('uiDebug', [
        '$assert',
        '$log',
        'uiDebugService',
        uiDebugDirective
    ]);

})(angular.module('UI'));
(function (app) {

    /**
     * @param {angular.ILogService} $log
     * @param {UI.Events} $uiEvents
     * @param {angular.IDocumentService} $document
     */
    function directive($log, $uiEvents, $document) {

        /**
         * @param {angular.IScope} scope
         * @param {Array.<Element>} el
         * @param {$compile.directive.Attributes} attr
         *
         * @private
         */
        function _link(scope, el, attr) {
            attr.$addClass('ui-divider ui-control');

            scope.$watch('dir', function (newValue, oldValue) {
                attr.$removeClass('ui-'+oldValue);
                attr.$addClass('ui-' + newValue);
            });

            function getDelta(event) {
                return scope.dir == 'vert' ? event.clientX : event.clientY;
            }

            angular.element(el).bind('mousedown', function (/** Event */event) {
                if (event.altKey || event.ctrlKey || event.shiftKey || ~~event.button !== 0) {
                    return;
                }

                event.preventDefault();
                attr.$addClass('ui-active');

                var start = getDelta(event);
                var end;

                $uiEvents.apply(scope, function () {
                    scope.start();
                });

                var move_id = $uiEvents.bind(scope, $document, 'mousemove', function (/**Event*/event) {
                    end = getDelta(event);
                    scope.move({'$value': end - start});
                });

                $uiEvents.once(scope, $document, 'mouseup', function (/**Event*/event) {
                    attr.$removeClass('ui-active');
                    event.preventDefault();
                    $uiEvents.unbind($document, move_id);
                    end = getDelta(event);
                    scope.move({'$value': end - start});
                    scope.end();
                });
            });
        }

        return {
            restrict: 'E',
            scope: {
                dir: '@',
                start: '&onStart',
                abort: '&onAbort',
                move: '&onMove',
                end: '&onEnd'
            },
            link: _link
        };
    }

    app.directive('uiDivider', [
        '$log',
        '$uiEvents',
        '$document',
        directive
    ]);

})(angular.module('UI'));
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
/**
 * @namespace UI.Menu
 */
(function (app) {

    app.directive('uiMenu', [
        function () {

            /**
             * @name UI.Menu.Controller
             *
             * @param {angular.IScope} $scope
             */
            function controller($scope) {
                var $target = null;
                /**
                 * @param {angular.IAugmentedJQuery} el
                 */
                this.setTarget = function (el) {
                    $target = el.length === 0
                        ? null : el;
                };
                /**
                 * @returns {ng.IAugmentedJQuery}
                 */
                this.getTarget = function () {
                    return $target;
                }
            }

            /**
             * @param {angular.IScope} scope
             * @param {Array.<Element>} el
             * @param {$compile.directive.Attributes} attr
             * @param {UI.Menu.Controller} $uiMenu
             * @param {function} transcludeFn
             * @private
             */
            function _link(scope, el, attr, $uiMenu, transcludeFn) {
                attr.$addClass('ui-menu');

                transcludeFn(function (clone) {
                    var $target = clone.find('[ui-menu-target]').first();
                    if ($target.length === 0) {
                        $target = clone.children().not('ui-menu-items').first();
                    }
                    $uiMenu.setTarget($target);
                    el.replaceWith(clone);
                });
            }

            return {
                restrict: 'E',
                transclude: 'element',
                scope: {
                    'embedded': '@'
                },
                link: _link,
                controller: [
                    '$scope',
                    controller
                ],
                controllerAs: '$uiMenu'
            }
        }
    ]);

})(angular.module('UI'));
/**
 * @namespace UI.Tabs
 */
(function (app) {

    app.directive('uiTabs', [
        '$log',
        '$uiWindows',
        function ($log, /** UI.Windows */$uiWindows) {

            /**
             * @name UI.Tabs.Scope
             *
             * @property {Array.<UI.Tabs.Tab>} tabs
             * @property {{active:number,showNav:boolean,maxWidth:number}} model
             * @property {Array.<UI.Windows.Options>} windows
             * @property {UI.DescTabs} desc
             */

            /**
             * @name UI.Tabs.Tab
             *
             * @param {number} id
             *
             * @constructor
             */
            var Tab = function (id) {
                this.options = $uiWindows.get(id);
                this.width = 0;
                this.visible = true;
                this.title = 'loading...';
            };

            /**
             * @name UI.Tabs.Controller
             *
             * @param {UI.Tabs.Scope} $scope
             */
            function controller($scope) {
                $scope.tabs = [];

                if($scope.desc) {
                    $scope.tabs = _.map($scope.desc.toArray(),function(id){
                        return new Tab(id);
                    });
                }

                $scope.windows = $uiWindows.getOptions();

                $scope.model = {};
                $scope.model.active = 0;
                $scope.model.showNav = false;

                /**
                 * @param {number} id
                 */
                this.add = function (id) {
                    $log.debug('$uiTabs::add ' + id);
                    $scope.tabs.push(new Tab(id));
                    $scope.model.active = $scope.tabs.length - 1;
                };

                this.next = function () {
                    $log.debug('$uiTabs::next');
                    if ($scope.model.active < $scope.tabs.length - 1) {
                        $scope.model.active++;
                    }
                };

                this.prev = function () {
                    $log.debug('$uiTabs::prev');
                    if ($scope.model.active > 0) {
                        $scope.model.active--;
                    }
                };

                this.remove = function (indx) {
                    $log.debug('$uiTabs::remove');
                    //$scope.active = $scope.active == 0 ? 0 : $scope.active - 1;
                };

                this.updateNav = function () {
                    var sum = 0;
                    var count = 0;
                    _.each($scope.tabs, function (tab) {
                        sum += tab.width;
                        tab.visible = sum < $scope.model.maxWidth;
                        if (tab.visible) {
                            count++;
                        }
                    });
                    $scope.model.showNav = count != $scope.tabs.length;
                }
            }

            /**
             * @param {UI.Tabs.Scope} scope
             * @param {Array.<Element>} el
             * @param {$compile.directive.Attributes} attr
             * @param {UI.Tabs.Controller} $uiTabs
             * @private
             */
            function _link(scope, el, attr, $uiTabs) {
                attr.$addClass('ui-tabs');

                scope.$watch('model.maxWidth', function () {
                    $uiTabs.updateNav();
                });
                scope.$watchCollection('tabs', function () {
                    $uiTabs.updateNav();
                })
            }

            return {
                restrict: 'E',
                transclude: true,
                scope: {
                    'desc': '='
                },
                link: _link,
                controller: [
                    '$scope',
                    controller
                ],
                controllerAs: '$uiTabs',
                templateUrl: '/src/UI/Controls/Tabs/Tabs.html'
            }
        }
    ]);

})(angular.module('UI'));
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
(function (app) {

    /**
     * @typedef {function(IAugmentedJQuery):UI.ModalContext} UI.ModalContextFactory
     *
     * @param {$assert} $assert
     * @param {angular.ILogService} $log
     * @param {angular.IQService} $q
     */
    function ModalContextFactory($assert, $log, $q) {

        /**
         * @name UI.ModalContext
         *
         * @param {*|IAugmentedJQuery} parent
         *
         * @constructor
         * @template T
         */
        function ModalControl(parent) {
            $assert.isElement(parent);

            /**
             * @type {angular.IAugmentedJQuery}
             * @private
             */
            this._parent = angular.element(parent);

            /**
             * @type {angular.IAugmentedJQuery|null}
             * @private
             */
            this._element = null;

            /**
             * @type {angular.IDeferred<T>}
             * @private
             */
            this._defer = $q.defer();

            /**
             * @returns {angular.IAugmentedJQuery}
             */
            this.getParent = function () {
                return this._parent;
            };

            /**
             * @param {angular.IAugmentedJQuery} el
             */
            this.setElement = function (el) {
                $assert.isElement(el);

                this._element = el;
            };

            /**
             * @returns {angular.IAugmentedJQuery|null}
             */
            this.getElement = function () {
                return this._element;
            };

            /**
             * @returns {angular.IPromise<T>} }
             */
            this.getPromise = function() {
                return this._defer.promise;
            };

            /**
             * @param {T} value
             */
            this.close = function(value) {
                this._defer.resolve(value);
            };

            /**
             * @param {T} value
             */
            this.cancel = function(value) {
                this._defer.reject(value);
            }
        }

        return ModalControl;
    }

    app.factory('$modalContextFactory', [
        '$assert',
        '$log',
        '$q',
        ModalContextFactory
    ]);

})(angular.module('UI'));
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

})(angular.module('UI'));
(function (app) {

    /**
     * @name UI.uiColumns
     *
     * @param {UI.uiLayout} uiLayout
     *
     * @constructor
     */
    function uiColumnsDirective(uiLayout) {

        /**
         * @param {UI.uiColumns.Scope} scope
         * @param {Element[]} el
         * @param {$compile.directive.Attributes} attr
         * @param {*} ctrl
         * @param {function} transcludeFn
         **/
        function _link(scope, el, attr, ctrl, transcludeFn) {
            attr.$addClass('ui-columns');
            transcludeFn(function(cloned){
                el.find('> .ui-columns-row').append(cloned);
            });
        }

        return {
            restrict: 'E',
            transclude: true,
            scope: {},
            link: _link,
            controllerAs: '$uiColumns',
            template: '<div class="ui-columns-row"></div>'
        }
    }

    app.directive('uiColumns', [
        'uiLayout',
        uiColumnsDirective
    ]);

    /**
     * @name UI.uiColumn
     *
     * @param {UI.uiLayout} uiLayout
     *
     * @constructor
     */
    function uiColumnDirective(uiLayout) {

        /**
         * @param {UI.uiColumn.Scope} scope
         * @param {Element[]} el
         * @param {$compile.directive.Attributes} attr
         **/
        function _link(scope, el, attr) {
            attr.$addClass('ui-column');
        }

        return {
            restrict: 'E',
            scope: {
                'grow': '@',
                'shrink': '@'
            },
            link: _link,
            controllerAs: '$uiColumn'
        };
    }

    app.directive('uiColumn', [
        'uiLayout',
        uiColumnDirective
    ]);

})(angular.module('UI'));
(function (app) {

    app.directive('uiSvgDrag', [
        'd3',
        '$parse',
        function (d3, $parse) {

            /**
             * @param {angular.IScope} scope
             * @param {Element[]} el
             * @param {$compile.directive.Attributes} attr
             * @private
             */
            function _link(scope, el, attr) {
                attr.$addClass('ui-svg-drag');

                var onDrag = attr.onDrag || '';
                var onDragStart = attr.onDragStart || '';
                var onDragEnd = attr.onDragEnd || '';

                var drag = d3.behavior.drag()
                    .origin(function (d) {
                        return d;
                    }).on("dragstart", function (d) {
                        d3.event.sourceEvent.stopPropagation();
                        scope.$apply(function () {
                            scope.$eval(onDragStart, {});
                        });
                    }).on("drag", function (d) {
                        scope.$apply(function () {
                            scope.$eval(onDrag, {$x: d3.event.x, $dx: d3.event.dx, $y: d3.event.y, $dy: d3.event.dy});
                        });
                    }).on("dragend", function (d) {
                        scope.$apply(function () {
                            scope.$eval(onDragEnd, {});
                        });
                    });

                d3.select(el[0])
                    .data([{"x": 0, "y": 0}])
                    .call(drag);
            }


            return {
                restrict: 'A',
                link: _link
            }
        }
    ])

})(angular.module('UI'));
(function (app) {

    app.directive('uiSvgGrid', [
        function () {
            return {
                restrict: 'A',
                link: function (scope, el, attr) {

                },
                scope: {
                    'unit': '@uiSvgGrid'
                },
                templateUrl: '/src/UI/SVG/Grid/Grid.html'
            }
        }
    ]);

})(angular.module('UI'));
(function (app) {

    app.directive('uiSvgGrip', [
        '$svgTurtle',
        function (/** Com.svgTurtle */$svgTurtle) {

            /**
             * @param {angular.IScope} scope
             * @param {Element[]} el
             * @param {$compile.directive.Attributes} attrs
             * @private
             */
            function _link(scope, el, attrs) {
                attrs.$addClass('ui-svg-grip');

                scope.$watchGroup(['count', 'size'], function (values) {
                    var c = ~~values[0] || 3;
                    var s = ~~values[1] / c;
                    var pen = new $svgTurtle();
                    for (var x = 1; x <= c; x++) {
                        var b = s * x;
                        pen.Move(0, -b).line(-b, b);
                    }
                    scope.path = pen.toString();
                });
            }

            return {
                restrict: 'A',
                scope: {
                    'size': '@',
                    'count': '@'
                },
                link: _link,
                templateUrl: '/src/UI/SVG/Grip/Grip.html'
            }

        }
    ]);

})(angular.module('UI'));
(function (app) {

    app.directive('uiSvgZoom', [
        'd3',
        function (d3) {
            return {
                restrict: 'A',
                link: function (scope, el, attr) {

                    var $svg = $(el).closest('svg');

                    var zoom = d3.behavior.zoom()
                        .scaleExtent([0.25, 10])
                        .on("zoom", function () {
                            d3.select(el[0]).attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
                        });

                    d3.select($svg[0]).call(zoom);
                }
            }
        }
    ])

})(angular.module('UI'));
(function (app) {

    /**
     * @name UI.uiDebugService
     *
     * @param {boolean} isEnabled
     *
     * @constructor
     */
    function DebugService(isEnabled) {
        var _show = false;
        /**
         * @param {boolean|string} value
         * @returns {UI.uiDebugService}
         */
        this.setDebug = function (value) {
            _show = angular.isString(value) ? value === 'true' : !!value;
            return this;
        };
        /**
         * @returns {boolean}
         */
        this.getDebug = function () {
            return isEnabled && _show;
        };

        /**
         * @returns {boolean}
         */
        this.isEnabled = function () {
            return isEnabled;
        }
    }

    /**
     * @name UI.uiDebugProvider
     */
    function DebugProvider() {

        var _enabled = false;

        /**
         * @param {boolean} value
         */
        this.setEnabled = function(value) {
            _enabled = !!value;
        };

        this.$get = function () {
            return new DebugService(_enabled);
        };
    }

    app.provider('uiDebugService', [
        DebugProvider
    ]);

})(angular.module('UI'));
(function (app) {
    /**
     * @name UI.Events
     *
     * @constructor
     */
    function _service() {
        this._count = 1;
    }

    /**
     * @name UI.Events#_fireCallback
     *
     * @param {angular.IScope} $scope
     * @param {Event} event
     * @param {function(Event)} func
     * @private
     */
    _service.prototype._fireCallback = function ($scope, event, func) {
        this.apply($scope, function () {
            func(event);
        });
    };

    /**
     * Executes the callback during a digest.
     *
     * @name UI.Events#apply
     *
     * @param {angular.IScope} $scope
     * @param {function()} func
     */
    _service.prototype.apply = function ($scope, func) {
        // $scope.$$phase ? $scope.$apply(func) : func();
        if ($scope.$$phase) {
            func();
        }
        else {
            $scope.$apply(function () {
                func();
            });
        }
    };

    /**
     * Binds an event handler to an element, and unbinds if when the scope is destroyed.
     *
     * @name UI.Events#bind
     *
     * @param {angular.IScope} $scope
     * @param {Array.<Element>|Element|jQuery|ng.IDocumentService|ng.IAugmentedJQuery} el
     * @param {string} event The type of event (click, resize, etc)
     * @param {function(Event)} func The event callback.
     *
     * @returns {string} The event ID
     */
    _service.prototype.bind = function ($scope, el, event, func) {
        var id = event + '.' + $scope.$id + this._count++;
        var $el = angular.element(el);
        $el.bind(id, function (e) {
            this._fireCallback($scope, e, func);
        }.bind(this));
        if ($el.scope() !== $scope) {
            $scope.$on('$destroy', function () {
                this.unbind($el, id);
            }.bind(this));
        }
        return id;
    };

    /**
     * Binds an event handler to an element, and unbinds if when the scope is destroyed.
     *
     * @name UI.Events#once
     *
     * @param {angular.IScope} $scope
     * @param {Array.<Element>|Element|jQuery|ng.IDocumentService|ng.IAugmentedJQuery} $el
     * @param {string} event The type of event (click, resize, etc)
     * @param {function(Event)} func The event callback.
     *
     * @returns {string} The event ID
     */
    _service.prototype.once = function ($scope, el, event, func) {
        var id = event + '.' + $scope.$id + this._count++;
        var $el = angular.element(el);
        $el.one(id, function (e) {
            this._fireCallback($scope, e, func);
        }.bind(this));
        if ($el.scope() !== $scope) {
            $scope.$on('$destroy', function () {
                this.unbind($el, id);
            }.bind(this));
        }
        return id;
    };

    /**
     * Removes a binding
     *
     * @name UI.Events#unbind
     *
     * @param {Array.<Element>|Element|jQuery|ng.IDocumentService|ng.IAugmentedJQuery} el
     * @param {string} id
     */
    _service.prototype.unbind = function (el, id) {
        angular.element(el).unbind(id);
    };

    app.service('$uiEvents', [
        _service
    ]);

})(angular.module('UI'));
(function (app) {

    /**
     * @name UI.uiLayout
     *
     * @description
     *
     * A very minimalist approach for a service that handles broadcast resize events for dynamic DOM listeners.
     *
     * @param {$assert} $assert
     * @param {angular.ILogService} $log
     * @param {Com.Events} $events
     * @param {angular.IWindowService} $window
     * @param {angular.IDocumentService} $document
     * @param {angular.IRootScopeService} $rootScope
     * @param {angular.ITimeoutService} $timeout
     *
     * @property {function(angular.IScope:scope,Element[]:el,function(number))} watchWidth
     * @property {function(angular.IScope:scope,Element[]:el,function(number))} watchHeight
     * @property {function(angular.IScope:scope,Element[]:el,function(number))} watchOuterWidth
     * @property {function(angular.IScope:scope,Element[]:el,function(number))} watchOuterHeight
     * @property {function(angular.IScope:scope,Element[]:el,function(number))} watchInnerWidth
     * @property {function(angular.IScope:scope,Element[]:el,function(number))} watchInnerWeight
     *
     * @property {function(angular.IScope:scope,Element[]:el,function(number,number))} watchSize
     * @property {function(angular.IScope:scope,Element[]:el,function(number,number))} watchOuterSize
     * @property {function(angular.IScope:scope,Element[]:el,function(number,number))} watchInnerSize
     *
     * @constructor
     */
    function LayoutService($assert, $log, $events, $window, $document, $rootScope, $timeout) {
        $log.debug('LayoutService::controller');

        /**
         * @type {Array.<function()>}
         */
        var watchers = [];

        /**
         * Makes first letter uppercase.
         *
         * @param {string} str
         */
        function firstUpper(str) {
            return str.replace(/^(.)(.*)$/, function (m, p1, p2, o, s) {
                return p1.toUpperCase() + p2;
            });
        }

        /**
         * @param {angular.IScope} scope
         * @param {function()} watcher
         */
        function addWatcher(scope, watcher) {
            watchers.push(watcher);
            scope.$on('$destroy', function () {
                watchers.splice(watchers.indexOf(watcher), 1);
            });
            $timeout(function () {
                watcher();
            });
        }

        _.each(['width', 'height', 'outerWidth', 'outerHeight', 'innerWidth', 'innerHeight'], function (name) {
            var method = "watch" + firstUpper(name);
            this[method] = function (scope, el, func) {
                $assert.isScope(scope);
                $assert.isElement(el);
                $assert.isFunction(func);
                addWatcher(scope, function () {
                    func(el[name]());
                });
            };
        }, this);

        _.each([['width', 'height'], ['outerWidth', 'outerHeight'], ['innerWidth'], ['innerHeight']], function (names) {
            var method = "watch" + firstUpper(names[0].replace(/[A-Z].*/, ''));
            method = method === 'watchWidth' ? 'watch' : method;
            method = method + 'Size';
            this[method] = function (scope, el, func) {
                $assert.isScope(scope);
                $assert.isElement(el);
                $assert.isFunction(func);
                addWatcher(scope, function () {
                    func(el[names[0]], el[names[1]]);
                });
            };
        });

        /**
         * @param {angular.IScope} scope
         * @param {Element[]} el
         * @param {function()} func
         */
        this.watch = function(scope,el,func) {
            $assert.isScope(scope);
            $assert.isElement(el);
            $assert.isFunction(func);
            addWatcher(scope, function () {
                func();
            });
        };

        this.$digesting = false;

        /**
         * Call this when ever the code causes the DOM elements to change size.
         *
         * @param {boolean=} immediately
         */
        this.redraw = function (immediately) {
            if(this.$digesting) {
                return;
            }
            this.$digesting = true;

            function digest() {
                _.each(watchers, function (watcher) {
                    watcher();
                });
            }

            if(immediately === true) {
                try {
                    digest();
                } finally {
                    this.$digesting = false;
                }
            } else {
                $timeout(function(){
                    try {
                        digest();
                    } finally {
                        this.$digesting = false;
                    }
                }.bind(this));
            }
        };

        $events.bind($rootScope, $window, 'resize', 'uiLayout', function () {
            this.redraw(true);
        }.bind(this));

        this.$dragging = false;
        $events.bind($rootScope, $document, 'mousedown', 'uiLayout', function(){
            this.$dragging = true;
        }.bind(this));

        $events.bind($rootScope, $document, 'mousemove', 'uiLayout', function(){
            this.$dragging && this.redraw(true);
        }.bind(this));

        $events.bind($rootScope, $document, 'mouseup', 'uiLayout', function(){
            try {
                this.redraw(true);
            } finally {
                this.$dragging = false;
            }
        }.bind(this));
    }

    app.service('uiLayout', [
        '$assert',
        '$log',
        '$events',
        '$window',
        '$document',
        '$rootScope',
        '$timeout',
        LayoutService
    ]);

})(angular.module('UI'));
(function (app) {

    /**
     * @name UI.Modal
     *
     * @param {$assert} $assert
     * @param {angular.ILogService} $log
     * @param {angular.IQService} $q
     * @param {angular.ITemplateRequestService} $templateRequest
     * @param {angular.IInjectorService} $injector
     * @param {angular.IRootScopeService} $rootScope
     * @param {angular.ICompileService} $compile
     * @param {UI.Timeout} $uiTimeout
     * @param {angular.IControllerService} $controller
     * @param {UI.ModalContextFactory} $modalContextFactory
     *
     * @constructor
     */
    function uiModal($assert, $log, $q, $templateRequest, $injector, $rootScope, $compile, $uiTimeout, $controller, $modalContextFactory) {

        /**
         * @name UI.Modal.Options
         *
         * @property {Object.<string,function>} resolve
         * @property {string|function} controller
         * @property {string} controllerAs
         * @property {boolean} bindToController
         * @property {string} template
         * @property {string|function} templateUrl
         * @property {angular.IScope} scope
         */

        /**
         * @param {UI.Modal.Options} options
         *
         * @returns {UI.Modal.Options}
         */
        this.extendDefaults = function (options) {
            var defaults = {
                resolve: {},
                controller: false,
                controllerAs: false,
                bindToController: false,
                template: false,
                templateUrl: false,
                scope: false
            };
            return angular.extend({}, defaults, options || {});
        };

        /**
         * @param {UI.Modal.Options} options
         */
        this.getTemplatePromise = function (options) {
            if (!options.template && !options.templateUrl) {
                throw new Error('One of template or templateUrl is required.');
            }
            return options.template ?
                $q.when(options.template) :
                $templateRequest(angular.isFunction(options.templateUrl) ? (options.templateUrl)() : options.templateUrl);
        };

        /**
         * @param {Object.<string,function|Array>} resolves
         *
         * @returns {Array}
         */
        this.getResolvePromises = function (resolves) {
            var promises = [];
            angular.forEach(resolves, function (value) {
                if (angular.isFunction(value) || angular.isArray(value)) {
                    promises.push($q.when($injector.invoke(value)));
                } else if (angular.isString(value)) {
                    promises.push($q.when($injector.get(value)));
                }
            });
            return promises;
        };

        /**
         * @param {UI.Modal.Options} options
         * @param {UI.ModalContext} $modalContext
         *
         * @returns {angular.IPromise}
         */
        this.resolveScope = function (options, $modalContext) {
            options = this.extendDefaults(options);
            return $q
                .all([this.getTemplatePromise(options)].concat(this.getResolvePromises(options.resolve)))
                .then(function (tplAndVars) {
                    var scope = options.scope || $rootScope.$new();
                    //controllers
                    var ctrlInstance, ctrlLocals = {};
                    var resolveIter = 1;
                    if (options.controller) {
                        ctrlLocals.$scope = scope;
                        ctrlLocals['$modalContext'] = $modalContext;
                        angular.forEach(options.resolve, function (value, key) {
                            ctrlLocals[key] = tplAndVars[resolveIter++];
                        });
                        ctrlInstance = $controller(options.controller, ctrlLocals);
                        if (options.controllerAs) {
                            if (options.bindToController) {
                                angular.extend(ctrlInstance, scope);
                            }
                            scope[options.controllerAs] = ctrlInstance;
                        }
                    }
                    scope.$template = tplAndVars[0];
                    return scope;
                });
        };

        /**
         * @param {UI.Modal.Options} options
         * @param {UI.ModalContext} context
         * @returns {UI.ModalContext}
         */
        this.create = function (options, context) {
            $assert.isObject(options);
            $assert.isInstanceOf(context, '$modalContextFactory');

            options.scope = options.scope || context.getParent().scope();

            this.resolveScope(options, context)
                .then(function (scope) {
                    var el = angular.element(scope.$template);
                    delete scope.$template;
                    context.setElement($compile(el)(scope, function (clone) {
                        context.getParent().append(clone);
                    }));
                    context.getPromise().finally(function () {
                        context.getElement().remove();
                    });
                });

            return context;
        };

        /**
         * @param {Element|jQuery|angular.IAugmentedJQuery|angular.IAugmentedJQueryStatic} parent
         * @param {UI.Modal.Options} options
         *
         * @returns {angular.IPromise<Element>}
         */
        this.appendTo = function (parent, options) {
            /**
             * @type {UI.ModalContext}
             */
            var context = new $modalContextFactory(parent);
            return this.create(options, context)
                .getPromise()
                .then(function () {
                    return context.getElement();
                });
        };

        /**
         * @param {Element|jQuery|angular.IAugmentedJQuery|angular.IAugmentedJQueryStatic} parent
         * @param {UI.Modal.Options} options
         *
         * @returns {angular.IPromise<T>}
         * @template T
         */
        this.show = function (parent, options) {
            /**
             * @type {UI.ModalContext<T>}
             */
            var context = new $modalContextFactory(parent);
            return this.create(options, context).getPromise();
        };
    }

    app.service('$uiModal', [
        '$assert',
        '$log',
        '$q',
        '$templateRequest',
        '$injector',
        '$rootScope',
        '$compile',
        '$uiTimeout',
        '$controller',
        '$modalContextFactory',
        uiModal
    ]);

})(angular.module('UI'));
(function (app) {

    /**
     * @name UI.Size
     */
    function service() {

        var DEFAULT_SIZE = 'md';

        /**
         * Adds the ui-size-## class if there is one, otherwise it inherits from the parent controllers.
         *
         * @param {angular.IScope} scope
         * @param {Element|Array.<Element>|jQuery} el
         * @param {Array.<UI.Size.Controller>=} parents
         */
        this.watchSize = function (scope, el, parents) {
            var $el = angular.element(el);
            scope.$watch('size', function (newValue, oldValue) {
                $el.removeClass('ui-size-' + oldValue);
                if (newValue) {
                    $el.addClass('ui-size-' + newValue);
                } else {
                    var size = _.find(parents || [], function (parent) {
                        return (parent && parent.getSize) ? parent.getSize() : false;
                    });
                    $el.addClass('ui-size-' + ((size && size.getSize()) || DEFAULT_SIZE));
                }
            });
        };

        /**
         * @param {Array.<UI.Size.Controller>} parents
         * @returns {string|boolean}
         */
        this.getParentSize = function (parents) {
            var parent = _.find(parents || [], function (parent) {
                return (parent && parent.getSize) ? parent.getSize() : false;
            });
            return parent
                ? parent.getSize() || DEFAULT_SIZE
                : DEFAULT_SIZE;
        }
    }

    app.service('$uiSize', [
        service
    ]);

    /**
     * @name UI.Size.Controller
     */
    app.controller('$uiSizeController', ['$scope', function ($scope) {
        this.getSize = function () {
            return $scope.size;
        }
    }]);

})(angular.module('UI'));
(function (app) {

    app.provider('$uiTimeout',
        function () {
            this.$get = [
                '$timeout',
                '$q',
                function ($timeout, $q) {

                    /**
                     * @name UI.Timeout
                     *
                     * @description
                     *
                     * Works like the $timeout service except count is the number of digests to execute before
                     * the func callback is executed.
                     *
                     * @param {function} func
                     * @param {number|function} value Can be a number or a function. Digesting will continue until function returns false.
                     * @param {number=} maxCount
                     *
                     * @returns {ng.IPromise}
                     */
                    function timeout(func, value, maxCount) {

                        if (!angular.isFunction(func)) {
                            throw new Error('Parameter func must be a function.');
                        }
                        if (!angular.isNumber(value) && !angular.isFunction(value)) {
                            throw new Error('Parameter value must be a number or function.');
                        }
                        maxCount = angular.isUndefined(maxCount)
                            ? 100
                            : ~~maxCount;

                        var count = 0;
                        var defer = $q.defer();

                        function wait() {
                            defer.promise.$$uiTimeout = $timeout(function () {
                                if(count >= maxCount) {
                                    throw new Error('Max number of digests reached.');
                                }
                                var cont = angular.isFunction(value)
                                    ? value()
                                    : count++ < +value;
                                if (cont) {
                                    wait();
                                    return;
                                }
                                defer.resolve(func(count));
                            }, 0);

                            return defer.promise;
                        }

                        return wait();
                    }

                    /**
                     * @param {angular.IPromise} promise
                     * @returns {boolean}
                     */
                    timeout.cancel = function (promise) {
                        if (promise && promise.$$uiTimeout) {
                            return $timeout.cancel(promise.$$uiTimeout);
                        }
                        return false;
                    };

                    return timeout;
                }]
        });

})(angular.module('UI'));
(function (app) {

    app.factory('$svgPath', [
        function () {
            /**
             * @name UI.svgPath
             *
             * @param {number=} x
             * @param {number=} y
             *
             * @constructor
             */
            function svgPath(x,y) {
                var _str = [];

                /**
                 * @param {number} x
                 * @param {number} y
                 * @returns {string}
                 */
                function pos(x, y) {
                    return x + ',' + y;
                }

                /**
                 * @param {number} x
                 * @param {number} y
                 * @returns {UI.svgPath}
                 */
                this.Move = function (x, y) {
                    _str.push('M ' + pos(x, y));
                    return this;
                };

                /**
                 * @param {number} x
                 * @param {number} y
                 *
                 * @returns {UI.svgPath}
                 */
                this.move = function (x, y) {
                    _str.push('m ' + pos(x, y));
                    return this;
                };

                /**
                 * @param {number} x
                 * @param {number} y
                 *
                 * @returns {UI.svgPath}
                 */
                this.Line = function (x, y) {
                    _str.push('L ' + pos(x, y));
                    return this;
                };

                /**
                 * @param {number} x
                 * @param {number} y
                 *
                 * @returns {UI.svgPath}
                 */
                this.line = function (x, y) {
                    _str.push('l ' + pos(x, y));
                    return this;
                };

                /**
                 * @param {number} x
                 *
                 * @returns {UI.svgPath}
                 */
                this.Horz = function (x) {
                    _str.push('H ' + x);
                    return this;
                };

                /**
                 * @param {number} x
                 *
                 * @returns {UI.svgPath}
                 */
                this.horz = function (x) {
                    _str.push('h ' + x);
                    return this;
                };

                /**
                 * @param {number} x
                 *
                 * @returns {UI.svgPath}
                 */
                this.Vert = function (x) {
                    _str.push('V ' + x);
                    return this;
                };

                /**
                 * @param {number} x
                 *
                 * @returns {UI.svgPath}
                 */
                this.vert = function (x) {
                    _str.push('v ' + x);
                    return this;
                };

                /**
                 * @param {number} x1
                 * @param {number} y1
                 * @param {number} x2
                 * @param {number} y2
                 * @param {number} x
                 * @param {number} y
                 *
                 * @returns {UI.svgPath}
                 */
                this.Cubic = function (x1, y1, x2, y2, x, y) {
                    _str.push('C ' + pos(x1, y1) + ' ' + pos(x2, y2) + ' ' + pos(x, y));
                    return this;
                };

                /**
                 * @param {number} x1
                 * @param {number} y1
                 * @param {number} x2
                 * @param {number} y2
                 * @param {number} x
                 * @param {number} y
                 *
                 * @returns {UI.svgPath}
                 */
                this.cubic = function (x1, y1, x2, y2, x, y) {
                    _str.push('c ' + pos(x1, y1) + ' ' + pos(x2, y2) + ' ' + pos(x, y));
                    return this;
                };

                /**
                 * @param {number} x1
                 * @param {number} y1
                 * @param {number} x
                 * @param {number} y
                 *
                 * @returns {UI.svgPath}
                 */
                this.SmoothCubic = function (x1, y1, x, y) {
                    _str.push('S ' + pos(x1, y1) + ' ' + pos(x, y));
                    return this;
                };

                /**
                 * @param {number} x1
                 * @param {number} y1
                 * @param {number} x
                 * @param {number} y
                 *
                 * @returns {UI.svgPath}
                 */
                this.smoothCubic = function (x1, y1, x, y) {
                    _str.push('s ' + pos(x1, y1) + ' ' + pos(x, y));
                    return this;
                };

                /**
                 * @param {number} x1
                 * @param {number} y1
                 * @param {number} x
                 * @param {number} y
                 *
                 * @returns {UI.svgPath}
                 */
                this.Quad = function (x1, y1, x, y) {
                    _str.push('Q ' + pos(x1, y1) + ' ' + pos(x, y));
                    return this;
                };

                /**
                 * @param {number} x1
                 * @param {number} y1
                 * @param {number} x
                 * @param {number} y
                 *
                 * @returns {UI.svgPath}
                 */
                this.quad = function (x1, y1, x, y) {
                    _str.push('q ' + pos(x1, y1) + ' ' + pos(x, y));
                    return this;
                };

                /**
                 * @param {number} x
                 * @param {number} y
                 *
                 * @returns {UI.svgPath}
                 */
                this.SmoothQuad = function (x, y) {
                    _str.push('T ' + pos(x, y));
                    return this;
                };

                /**
                 * @param {number} x
                 * @param {number} y
                 *
                 * @returns {UI.svgPath}
                 */
                this.smoothQuad = function (x, y) {
                    _str.push('t ' + pos(x, y));
                    return this;
                };

                /**
                 * @param {number} rx
                 * @param {number} ry
                 * @param xAxis
                 * @param flag
                 * @param sweepFlag
                 * @param {number} x
                 * @param {number} y
                 *
                 * @returns {UI.svgPath}
                 */
                this.Arc = function(rx, ry, xAxis, flag, sweepFlag, x, y) {
                    _str.push('A ' + pos(rx, ry) + ' ' + xAxis + ' ' + flag + ' ' + sweepFlag + ' ' + pos(x,y));
                    return this;
                };

                /**
                 * @param {number} rx
                 * @param {number} ry
                 * @param xAxis
                 * @param flag
                 * @param sweepFlag
                 * @param {number} x
                 * @param {number} y
                 *
                 * @returns {UI.svgPath}
                 */
                this.arc = function(rx, ry, xAxis, flag, sweepFlag, x, y) {
                    _str.push('a ' + pos(rx, ry) + ' ' + xAxis + ' ' + flag + ' ' + sweepFlag + ' ' + pos(x,y));
                    return this;
                };

                /**
                 * @returns {UI.svgPath}
                 */
                this.Close = function() {
                    _str.push('Z');
                    return this;
                };

                /**
                 * @returns {UI.svgPath}
                 */
                this.close = function() {
                    _str.push('z');
                    return this;
                };

                /**
                 * @returns {string}
                 */
                this.toString = function () {
                    return _str.join(' ');
                };

                if(angular.isNumber(x) && angular.isNumber(y)) {
                    this.Move(x,y);
                }
            }

            return svgPath;
        }
    ]);

})(angular.module('UI'));
(function (app) {

    var goRight = {
        'up': 'right',
        'right': 'down',
        'down': 'left',
        'left': 'up'
    };

    var goLeft = {
        'up': 'left',
        'right': 'up',
        'down': 'right',
        'left': 'down'
    };

    app.factory('$svgTurtle', [
        '$svgPath',
        function ($svgPath) {
            /**
             * @name UI.svgTurtle
             * @extends UI.svgPath
             *
             * @param {number=} x
             * @param {number=} y
             *
             * @constructor
             */
            function svgTurtle(x, y) {

                $svgPath.call(this, x, y);

                var _dir;
                var _vec;

                /**
                 * @param {string} dir
                 *
                 * @returns {UI.svgTurtle}
                 */
                this.face = function (dir) {
                    _dir = dir.toLowerCase();
                    switch (_dir) {
                        case 'up':
                            _vec = [0, -1];
                            break;
                        case 'down':
                            _vec = [0, 1];
                            break;
                        case 'left':
                            _vec = [-1, 0];
                            break;
                        case 'right':
                            _vec = [1, 0];
                            break;
                    }
                    return this;
                };

                /**
                 * @param {number} dist
                 *
                 * @returns {UI.svgTurtle}
                 */
                this.go = function (dist) {
                    this.line(_vec[0] * dist, _vec[1] * dist);
                    return this;
                };

                /**
                 * @param {number} rad
                 *
                 * @returns {UI.svgTurtle}
                 */
                this.arcLeft = function (rad) {
                    switch (_dir) {
                        case 'up':
                            break;
                        case 'down':
                            break;
                        case 'left':
                            break;
                        case 'right':
                            break;
                    }
                    return this;
                };

                /**
                 * @returns {UI.svgTurtle}
                 */
                this.turnRight = function () {
                    return this.face(goRight[_dir]);
                };

                /**
                 * @returns {UI.svgTurtle}
                 */
                this.turnLeft = function() {
                    return this.face(goLeft[_dir]);
                };

                /**
                 * @param {number} rad
                 *
                 * @returns {UI.svgTurtle}
                 */
                this.arcRight = function (rad) {
                    var p1 = [_vec[0] * rad, _vec[1] * rad];
                    this.turnRight();
                    var p2 = [_vec[0] * rad, _vec[1] * rad];
                    this.quad(p1[0], p1[1], p1[0] + p2[0], p1[1] + p2[1]);
                    return this;
                };

                this.face('up');
            }

            // inherit the prototype of $svgPath
            svgTurtle.prototype = _.create($svgPath.prototype, {
                'constructor': svgTurtle
            });

            return svgTurtle;
        }
    ]);

})(angular.module('UI'));
/**
 * @namespace UI.MenuItem
 */
(function(app){

    app.directive('uiMenuItem',[
        function() {

            /**
             * @name UI.MenuItem.Controller
             *
             * @param {angular.IScope} $scope
             */
            function controller($scope) {

            }

            /**
             * @param {angular.IScope} scope
             * @param {Array.<Element>} el
             * @param {$compile.directive.Attributes} attr
             * @param {UI.MenuItem.Controller} ctrl
             * @param {function} transcludeFn
             * @private
             */
            function _link(scope, el, attr, ctrl, transcludeFn) {
                attr.$addClass('ui-menu-item');

                var $el = angular.element(el);

                transcludeFn(function(clone){
                    $el.append(clone);
                });
            }

            return {
                restrict: 'E',
                transclude: true,
                scope: {},
                link: _link,
                controller: [
                    '$scope',
                    controller
                ],
                controllerAs: '$uiMenuItem'
            }
        }
    ]);

})(angular.module('UI'));
/**
 * @namespace UI.MenuItems
 */
(function (app) {

    app.directive('uiMenuItems', [
        '$uiEvents',
        '$document',
        function (/** UI.Events */$events, /** ng.IDocumentService */$document) {

            /**
             * @name UI.MenuItems.Scope
             * @extends angular.IScope
             *
             * @property {string} show
             */

            /**
             * @name UI.MenuItems.Controller
             *
             * @param {UI.MenuItems.Scope} $scope
             */
            function controller($scope) {
            }

            /**
             * @param {UI.MenuItems.Scope} scope
             * @param {Array.<Element>} el
             * @param {$compile.directive.Attributes} attr
             * @param {UI.Menu.Controller} $uiMenu
             * @param {function} transcludeFn
             *
             * @private
             */
            function _link(scope, el, attr, $uiMenu, transcludeFn) {
                el.addClass('ui-menu-items ng-hide');

                scope.$watch('show', function (value) {
                    if(value === 'true') {
                        el.removeClass('ng-hide');
                        return;
                    }
                    el.addClass('ng-hide');
                });

                transcludeFn(function (clone) {
                    el.append(clone);

                    var $target = $uiMenu.getTarget();
                    if($target === null) {
                        el.addClass('embedded');
                        return;
                    }

                    $events.bind(scope, $target, 'click', function (/** Event */event) {
                        event.stopPropagation();
                        el.removeClass('ng-hide');
                        $events.once(scope, $document, 'click', function (event) {
                            el.addClass('ng-hide');
                        });

                        var pos = $target.position();

                        pos.top -= 8;
                        pos.left -= 16;

                        $el.css({
                            top: pos.top + 'px',
                            left: pos.left + 'px'
                        });
                    });
                });
            }

            return {
                restrict: 'E',
                require: '^uiMenu',
                transclude: true,
                scope: {
                    show: '@'
                },
                link: _link,
                controller: [
                    '$scope',
                    controller
                ],
                controllerAs: '$uiMenuItems'
            }
        }
    ]);

})(angular.module('UI'));
/**
 * @namespace UI.Tab
 */
(function (app) {

    app.directive('uiTab', [
        '$log',
        '$uiWindows',
        function ($log, /** UI.Windows */$uiWindows) {

            /**
             * @name UI.Tab.Scope
             *
             * @property {number} windowId
             * @property {string} title
             * @property {boolean} active
             */

            /**
             * @name UI.Tab.Controller
             * @param {UI.Tab.Scope} $scope
             */
            function controller($scope) {

                /**
                 * @returns {boolean}
                 */
                this.isActive = function() {
                    return $scope.active;
                };

                /**
                 * @param {string} title
                 */
                this.setTitle = function (title) {
                    $scope.title = title;
                };

                /**
                 * @returns {string}
                 */
                this.getTitle = function () {
                    return $scope.title;
                }
            }

            /**
             * @param {UI.Tab.Scope} scope
             * @param {Array.<Element>} el
             * @param {$compile.directive.Attributes} attr
             * @param {UI.Tabs.Controller} tabs
             * @private
             */
            function _link(scope, el, attr, tabs) {
                attr.$addClass('ui-tab');

                scope.$watch('windowId', function (value) {
                    var options = $uiWindows.get(~~value);
                    scope.title = options.title;
                    var parent = angular.element(el).empty();
                    $uiWindows.create(parent, options.$id);
                });
            }

            return {
                restrict: 'E',
                require: '^uiTabs',
                scope: {
                    'windowId': '@',
                    'active': '@',
                    'title': '='
                },
                link: _link,
                controller: [
                    '$scope',
                    controller
                ],
                controllerAs: '$uiTab'
            }
        }
    ]);

})(angular.module('UI'));
/**
 * @namespace UI.ToolbarInput
 */
(function (app) {

    app.directive('uiToolbarInput', [
        '$log',
        function ($log) {

            /**
             * @name UI.ToolbarInput.Scope
             */

            /**
             * @name UI.ToolbarInput.Controller
             * @param {UI.ToolbarInput.Scope} $scope
             */
            function controller($scope) {
            }

            /**
             * @param {UI.ToolbarInput.Scope} scope
             * @param {Array.<Element>} el
             * @param {$compile.directive.Attributes} attr
             * @param {UI.ToolbarInput.Controller} $uiToolbarInput
             * @private
             */
            function _link(scope, el, attr, $uiToolbarInput) {
                attr.$addClass('ui-toolbar-input');
            }

            return {
                restrict: 'E',
                scope: {
                    'name': '@',
                    'model': '='
                },
                link: _link,
                controller: [
                    '$scope',
                    controller
                ],
                controllerAs: '$uiToolbarInput',
                templateUrl: '/src/UI/Controls/Toolbar/ToolbarInput/ToolbarInput.html'
            }
        }
    ]);

})(angular.module('UI'));