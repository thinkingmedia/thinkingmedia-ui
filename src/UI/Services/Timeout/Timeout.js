/**
 * @ngdoc service
 * @name ui.services.uiTimeout
 */
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

})(angular.module('thinkingmedia.ui.services'));