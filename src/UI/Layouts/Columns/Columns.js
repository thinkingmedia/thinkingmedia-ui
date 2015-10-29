/**
 * @ngdoc directive
 * @name ui.layouts.uiColumns
 */
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