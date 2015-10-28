# ui
UI library for AngularJS

## Get Started

**(1)** Get ThinkingMedia-UI in one of the following ways:
 - clone & build this repository
 - [download the release](http://angular-ui.github.io/ui-router/release/angular-ui-router.js) (or [minified](http://angular-ui.github.io/ui-router/release/angular-ui-router.min.js))
 - via **[Bower](http://bower.io/)**: by running `$ bower install thinkingmedia-ui` from your console

**(2)** Include `thinkingmedia-ui.js` (or `thinkingmedia-ui.min.js`) in your `index.html`, after including Angular itself

**(3)** Add `'thinkingmedia.ui'` to your main module's list of dependencies

When you're done, your setup should look similar to the following:

>
```html
<!doctype html>
<html ng-app="myApp">
<head>
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.1.5/angular.min.js"></script>
    <script src="js/thinkingmedia-ui.min.js"></script>
    <script>
        var myApp = angular.module('myApp', ['thinkingmedia.ui']);
    </script>
    ...
</head>
<body>
    ...
</body>
</html>
```

## Build

x

```
$ git clone https://github.com/thinkingmedia/thinkingmedia-ui thinkingmedia-ui
$ cd thinkingmedia-ui
$ npm install
$ bower install
$ grunt build
```