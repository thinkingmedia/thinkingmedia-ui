/**
 * @ngdoc service
 * @name ui.services.uiEvents
 */
(function (app) {

    /**
     * @name UI.Events
     *
     * @param {$assert} $assert
     *
     * @constructor
     */
    function Events($assert) {

        /**
         * @type {number}
         * @private
         */
        this._count = 1;

        /**
         * @param {angular.IScope|angular.IRootScopeService} $scope
         * @param {Event} event
         * @param {function(Event)} func
         * @private
         */
        this._fireCallback = function ($scope, event, func) {
            $assert.isScope($scope);
            $assert.isObject(event);
            $assert.isFunction(func);

            this.apply($scope, function () {
                func(event);
            });
        };

        /**
         * Executes the callback during a digest.
         *
         * @param {angular.IScope|angular.IRootScopeService} $scope
         * @param {function()} func
         */
        this.apply = function ($scope, func) {
            $assert.isScope($scope);
            $assert.isFunction(func);

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
         * @param {angular.IScope|angular.IRootScopeService} $scope
         * @param {Element|Element[]|angular.IDocumentService|angular.IWindowService} el
         * @param {string} event The type of event (click, resize, etc)
         * @param {function(Event)} func The event callback.
         *
         * @returns {function()}
         */
        this.bind = function ($scope, el, event, func) {
            $assert.isScope($scope);
            $assert.isObject(el);
            $assert.isStringNotEmpty(event);
            $assert.isFunction(func);

            var id = event + '.events-' + this._count++;
            angular.element(el).bind(id, function (e) {
                this._fireCallback($scope, e, func);
            }.bind(this));
            $scope.$on('$destroy', function () {
                angular.element(el).unbind(id);
            });

            var unbind = function() {
                this.unbind(el,id);
            }.bind(this);
            unbind.id = id;
            return unbind;
        };

        /**
         * Binds an event handler to an element, and unbinds if when the scope is destroyed.
         *
         * @param {angular.IScope} $scope
         * @param {Element|Element[]|angular.IDocumentService|angular.IWindowService} el
         * @param {string} event The type of event (click, resize, etc)
         * @param {function(Event)} func The event callback.
         *
         * @returns {function()}
         */
        this.once = function ($scope, el, event, func) {
            $assert.isScope($scope);
            $assert.isObject(el);
            $assert.isStringNotEmpty(event);
            $assert.isFunction(func);

            var id = event + '.events-' + this._count++;
            angular.element(el).one(id, function (e) {
                this._fireCallback($scope, e, func);
            }.bind(this));
            $scope.$on('$destroy', function () {
                angular.element(el).unbind(id);
            });

            var unbind = function() {
                this.unbind(el,id);
            }.bind(this);
            unbind.id = id;
            return unbind;
        };

        /**
         * Removes a binding
         *
         * @param {Element|Element[]|angular.IDocumentService|angular.IWindowService} el
         * @param {string|function()} id
         */
        this.unbind = function (el, id) {
            $assert.isObject(el);

            if(angular.isString(id)) {
                $assert.isStringNotEmpty(id);
                angular.element(el).unbind(id);
            } else if(angular.isFunction(id) && id.hasOwnProperty('id')) {
                id();
            }
        };

    }

    app.service('$uiEvents', [
        '$assert',
        Events
    ]);

})(angular.module('thinkingmedia.ui.services'));