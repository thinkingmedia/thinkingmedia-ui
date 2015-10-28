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