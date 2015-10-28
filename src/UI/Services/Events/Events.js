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