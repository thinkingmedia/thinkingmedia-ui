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