/**
 * @ngdoc service
 * @name ui.services.uiLayout
 */
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

})(angular.module('thinkingmedia.ui.services'));