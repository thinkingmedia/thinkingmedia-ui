/**
 * @ngdoc service
 * @name ui.factories.$modalContextFactory
 */
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