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