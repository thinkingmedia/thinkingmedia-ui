/**
 * @ngdoc overview
 * @name ui
 *
 * @requires ui.components
 * @requires ui.controls
 * @requires ui.factories
 * @requires ui.layouts
 * @requires ui.services
 * @requires ui.styles
 * @requires ui.SVG
 *
 * @description
 *
 * # ThinkingMedia-UI
 *
 * You have to load the module JS file, and also the compiled CSS file. This module can be loaded as a
 * dependency for your app by using the name `thinkingmedia.ui`.
 *
 * <pre>
 * <!doctype html>
 * <html ng-app="myApp">
 * <head>
 *   <!-- Include the thinkingmedia-ui styles -->
 *   <link rel="stylesheet" href="css/thinkingmedia-ui.min.css" type="text/css"/>
 *   <script src="js/angular.js"></script>
 *   <!-- Include the thinkingmedia-ui script -->
 *   <script src="js/thinkingmedia-ui.min.js"></script>
 *   <script>
 *     // ...and add 'thinkingmedia.ui' as a dependency
 *     var myApp = angular.module('myApp', ['thinkingmedia.ui']);
 *   </script>
 * </head>
 * <body>
 * </body>
 * </html>
 * </pre>
 */
(function(app){

})(angular.module('thinkingmedia.ui',[
    'thinkingmedia.ui.components',
    'thinkingmedia.ui.controls',
    'thinkingmedia.ui.factories',
    'thinkingmedia.ui.layouts',
    'thinkingmedia.ui.services',
    'thinkingmedia.ui.styles',
    'thinkingmedia.ui.svg',
    'ngAssert'
]));