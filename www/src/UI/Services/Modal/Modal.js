/**
 * @ngdoc service
 * @name ui.services.uiModal
 */
(function (app) {

    /**
     * @name UI.Modal
     *
     * @param {$assert} $assert
     * @param {angular.ILogService} $log
     * @param {angular.IQService} $q
     * @param {angular.ITemplateRequestService} $templateRequest
     * @param {angular.IInjectorService} $injector
     * @param {angular.IRootScopeService} $rootScope
     * @param {angular.ICompileService} $compile
     * @param {UI.Timeout} $uiTimeout
     * @param {angular.IControllerService} $controller
     * @param {UI.ModalContextFactory} $modalContextFactory
     *
     * @constructor
     */
    function uiModal($assert, $log, $q, $templateRequest, $injector, $rootScope, $compile, $uiTimeout, $controller, $modalContextFactory) {

        /**
         * @name UI.Modal.Options
         *
         * @property {Object.<string,function>} resolve
         * @property {string|function} controller
         * @property {string} controllerAs
         * @property {boolean} bindToController
         * @property {string} template
         * @property {string|function} templateUrl
         * @property {angular.IScope} scope
         */

        /**
         * @param {UI.Modal.Options} options
         *
         * @returns {UI.Modal.Options}
         */
        this.extendDefaults = function (options) {
            var defaults = {
                resolve: {},
                controller: false,
                controllerAs: false,
                bindToController: false,
                template: false,
                templateUrl: false,
                scope: false
            };
            return angular.extend({}, defaults, options || {});
        };

        /**
         * @param {UI.Modal.Options} options
         */
        this.getTemplatePromise = function (options) {
            if (!options.template && !options.templateUrl) {
                throw new Error('One of template or templateUrl is required.');
            }
            return options.template ?
                $q.when(options.template) :
                $templateRequest(angular.isFunction(options.templateUrl) ? (options.templateUrl)() : options.templateUrl);
        };

        /**
         * @param {Object.<string,function|Array>} resolves
         *
         * @returns {Array}
         */
        this.getResolvePromises = function (resolves) {
            var promises = [];
            angular.forEach(resolves, function (value) {
                if (angular.isFunction(value) || angular.isArray(value)) {
                    promises.push($q.when($injector.invoke(value)));
                } else if (angular.isString(value)) {
                    promises.push($q.when($injector.get(value)));
                }
            });
            return promises;
        };

        /**
         * @param {UI.Modal.Options} options
         * @param {UI.ModalContext} $modalContext
         *
         * @returns {angular.IPromise}
         */
        this.resolveScope = function (options, $modalContext) {
            options = this.extendDefaults(options);
            return $q
                .all([this.getTemplatePromise(options)].concat(this.getResolvePromises(options.resolve)))
                .then(function (tplAndVars) {
                    var scope = options.scope || $rootScope.$new();
                    //controllers
                    var ctrlInstance, ctrlLocals = {};
                    var resolveIter = 1;
                    if (options.controller) {
                        ctrlLocals.$scope = scope;
                        ctrlLocals['$modalContext'] = $modalContext;
                        angular.forEach(options.resolve, function (value, key) {
                            ctrlLocals[key] = tplAndVars[resolveIter++];
                        });
                        ctrlInstance = $controller(options.controller, ctrlLocals);
                        if (options.controllerAs) {
                            if (options.bindToController) {
                                angular.extend(ctrlInstance, scope);
                            }
                            scope[options.controllerAs] = ctrlInstance;
                        }
                    }
                    scope.$template = tplAndVars[0];
                    return scope;
                });
        };

        /**
         * @param {UI.Modal.Options} options
         * @param {UI.ModalContext} context
         * @returns {UI.ModalContext}
         */
        this.create = function (options, context) {
            $assert.isObject(options);
            $assert.isInstanceOf(context, '$modalContextFactory');

            options.scope = options.scope || context.getParent().scope();

            this.resolveScope(options, context)
                .then(function (scope) {
                    var el = angular.element(scope.$template);
                    delete scope.$template;
                    context.setElement($compile(el)(scope, function (clone) {
                        context.getParent().append(clone);
                    }));
                    context.getPromise().finally(function () {
                        context.getElement().remove();
                    });
                });

            return context;
        };

        /**
         * @param {Element|jQuery|angular.IAugmentedJQuery|angular.IAugmentedJQueryStatic} parent
         * @param {UI.Modal.Options} options
         *
         * @returns {angular.IPromise<Element>}
         */
        this.appendTo = function (parent, options) {
            /**
             * @type {UI.ModalContext}
             */
            var context = new $modalContextFactory(parent);
            return this.create(options, context)
                .getPromise()
                .then(function () {
                    return context.getElement();
                });
        };

        /**
         * @param {Element|jQuery|angular.IAugmentedJQuery|angular.IAugmentedJQueryStatic} parent
         * @param {UI.Modal.Options} options
         *
         * @returns {angular.IPromise<T>}
         * @template T
         */
        this.show = function (parent, options) {
            /**
             * @type {UI.ModalContext<T>}
             */
            var context = new $modalContextFactory(parent);
            return this.create(options, context).getPromise();
        };
    }

    app.service('$uiModal', [
        '$assert',
        '$log',
        '$q',
        '$templateRequest',
        '$injector',
        '$rootScope',
        '$compile',
        '$uiTimeout',
        '$controller',
        '$modalContextFactory',
        uiModal
    ]);

})(angular.module('thinkingmedia.ui.services'));