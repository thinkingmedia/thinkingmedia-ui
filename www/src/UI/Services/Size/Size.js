/**
 * @ngdoc service
 * @name ui.services.uiSize
 *
 * @deprecated Use uiHeight instead.
 */
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

})(angular.module('thinkingmedia.ui.services'));