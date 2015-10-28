(function (app) {

    /**
     * @name $assert
     *
     * @param {angular.IInjectorService} $injector
     *
     * @property {function} isTrue
     * @property {function} isFalse
     * @property {function} isTruthy
     * @property {function} isFalsy
     * @property {function} isArray
     * @property {function} isBlankObject
     * @property {function} isBlob
     * @property {function} isBoolean
     * @property {function} isDate
     * @property {function} isElement
     * @property {function} isFile
     * @property {function} isFunction
     * @property {function} isFormData
     * @property {function} isNumber
     * @property {function} isString
     * @property {function} isStringNotEmpty
     * @property {function} isScope
     * @property {function} isWindow
     * @property {function} isUndefined
     * @property {function} isObject
     * @property {function} isRegExp
     * @property {function} isPromiseLike
     * @property {function} isTypedArray
     *
     * @property {function} isTrueOrUndefined
     * @property {function} isFalseOrUndefined
     * @property {function} isArrayOrUndefined
     * @property {function} isBlankObjectOrUndefined
     * @property {function} isBlobOrUndefined
     * @property {function} isBooleanOrUndefined
     * @property {function} isDateOrUndefined
     * @property {function} isElementOrUndefined
     * @property {function} isFileOrUndefined
     * @property {function} isFunctionOrUndefined
     * @property {function} isFormDataOrUndefined
     * @property {function} isNumberOrUndefined
     * @property {function} isStringOrUndefined
     * @property {function} isStringNotEmptyOrUndefined
     * @property {function} isScopeOrUndefined
     * @property {function} isWindowOrUndefined
     * @property {function} isUndefinedOrUndefined
     * @property {function} isObjectOrUndefined
     * @property {function} isRegExpOrUndefined
     * @property {function} isPromiseLikeOrUndefined
     * @property {function} isTypedArrayOrUndefined
     *
     * @property {function} isTrueOrNull
     * @property {function} isFalseOrNull
     * @property {function} isArrayOrNull
     * @property {function} isBlankObjectOrNull
     * @property {function} isBlobOrNull
     * @property {function} isBooleanOrNull
     * @property {function} isDateOrNull
     * @property {function} isElementOrNull
     * @property {function} isFileOrNull
     * @property {function} isFunctionOrNull
     * @property {function} isFormDataOrNull
     * @property {function} isNumberOrNull
     * @property {function} isStringOrNull
     * @property {function} isStringNotEmptyOrNull
     * @property {function} isScopeOrNull
     * @property {function} isWindowOrNull
     * @property {function} isUndefinedOrNull
     * @property {function} isObjectOrNull
     * @property {function} isRegExpOrNull
     * @property {function} isPromiseLikeOrNull
     * @property {function} isTypedArrayOrNull
     *
     * @constructor
     */
    function Assert($injector) {

        var TYPED_ARRAY_REGEXP = /^\[object (Uint8(Clamped)?)|(Uint16)|(Uint32)|(Int8)|(Int16)|(Int32)|(Float(32)|(64))Array\]$/;

        var assertMethods = {

            /**
             * @param {boolean} value
             * @returns {boolean}
             */
            isTrue: function(value) {
                return typeof value === 'boolean' && value === true;
            },

            /**
             * @param {boolean} value
             * @returns {boolean}
             */
            isFalse: function(value) {
                return typeof value === 'boolean' && value === false;
            },

            /**
             * @param {boolean} value
             * @returns {boolean}
             */
            isTruthy: function(value) {
                return !!value;
            },

            /**
             * @param {boolean} value
             * @returns {boolean}
             */
            isFalsy: function(value) {
                return !value;
            },

            /**
             * @param {Array} value
             * @returns {boolean}
             */
            isTypedArray: function (value) {
                return TYPED_ARRAY_REGEXP.test(toString.call(value));
            },

            /**
             * @param {angular.IScope} obj
             * @returns {boolean}
             */
            isScope: function (obj) {
                return angular.isObject(obj) && !!obj.$evalAsync && !!obj.$watch;
            },

            /**
             * @param {Window} obj
             * @returns {boolean}
             */
            isWindow: function (obj) {
                return angular.isObject(obj) && obj.window === obj;
            },

            /**
             * @param {Object} obj
             * @returns {boolean}
             */
            isFile: function (obj) {
                return angular.isObject(obj) && toString.call(obj) === '[object File]';
            },

            /**
             * @param {Object} obj
             * @returns {boolean}
             */
            isFormData: function (obj) {
                return angular.isObject(obj) && toString.call(obj) === '[object FormData]';
            },

            /**
             * @param {Object} obj
             * @returns {boolean}
             */
            isBlob: function (obj) {
                return angular.isObject(obj) && toString.call(obj) === '[object Blob]';
            },

            /**
             * @param {boolean} value
             * @returns {boolean}
             */
            isBoolean: function (value) {
                return typeof value === 'boolean';
            },

            /**
             * @param {Object} obj
             * @returns {boolean}
             */
            isPromiseLike: function (obj) {
                return angular.isObject(obj) && angular.isFunction(obj.then);
            },

            /**
             * @param {RegExp} value
             * @returns {boolean}
             */
            isRegExp: function (value) {
                return angular.isObject(value) && toString.call(value) === '[object RegExp]';
            },

            /***
             * @param {string} value
             * @returns {boolean}
             */
            isStringNotEmpty: function (value) {
                return typeof value === 'string' && value !== '';
            }
        };

        // some automatic assert types.
        var types = [
            ['Array', angular],
            ['BlankObject', angular],
            ['Boolean', assertMethods],
            ['Date', angular],
            ['Element', angular],
            ['Function', angular],
            ['Number', angular],
            ['String', angular],
            ['Undefined', angular],
            ['Object', angular],
            ['StringNotEmpty', assertMethods],
            ['Blob', assertMethods],
            ['File', assertMethods],
            ['FormData', assertMethods],
            ['Scope', assertMethods],
            ['Window', assertMethods],
            ['RegExp', assertMethods],
            ['PromiseLike', assertMethods],
            ['TypedArray', assertMethods]
        ];

        _.each(types, function (type) {
            var self = this;
            var angularName = 'is' + type[0];
            var name;
            self[angularName] = function (value) {
                if (!type[1][angularName](value)) {
                    var caller = (self[angularName].caller && self[angularName].caller.name) || '??';
                    throw new Error(caller + ' -> Parameter is not a ' + type[0].toLowerCase() + '.');
                }
                return self;
            };
            if (type[0] !== 'Undefined') {
                name = 'is' + type[0] + 'OrUndefined';
                self[name] = function (value) {
                    if (!type[1][angularName](value) && !angular.isUndefined(value)) {
                        var caller = (self[name].caller && self[name].caller.name) || '??';
                        throw new Error(caller + ' -> Parameter is not a ' + type[0].toLowerCase() + ' or undefined.');
                    }
                    return self;
                };
            }
            name = 'is' + type[0] + 'OrNull';
            self[name] = function (value) {
                if (!type[1][angularName](value) && value !== null) {
                    var caller = (self[name].caller && self[name].caller.name) || '??';
                    throw new Error(caller + ' -> Parameter is not a ' + type[0].toLowerCase() + ' or null.');
                }
                return self;
            };
        }.bind(this));

        /**
         * @param {*} value
         * @param {string} type
         *
         * @returns {$assert}
         */
        this.isInstanceOf = function (value, type) {
            var inst = angular.isString(type) ? $injector.get(type) : type;
            if (!inst) {
                throw new Error('invalid type for isInstanceOf: ' + type);
            }
            var caller = (this.isInstanceOf.caller && this.isInstanceOf.caller.name) || '??';
            if (angular.isUndefined(value)) {
                throw new Error(caller + ' -> Parameter is undefined but should be an instance of ' + type);
            }
            if (!(value instanceof inst)) {
                throw new Error(caller + ' -> Parameter is not an instance of ' + type);
            }
            return this;
        };

        /**
         * @param {*} value
         * @param {string} type
         *
         * @returns {$assert}
         */
        this.isInstanceOfOrUndefined = function (value, type) {
            var inst = angular.isString(type) ? $injector.get(type) : type;
            if (!inst) {
                throw new Error('invalid type for isInstanceOf: ' + type);
            }
            if (!angular.isUndefined(value) && !(value instanceof inst)) {
                var caller = (this.isInstanceOfOrUndefined.caller && this.isInstanceOfOrUndefined.caller.name) || '??';
                throw new Error(caller + ' -> Parameter is not an instance of ' + type + ' and is not undefined.');
            }
            return this;
        };

        /**
         * @param {*} value
         * @param {string} type
         *
         * @returns {$assert}
         */
        this.isInstanceOfOrNull = function (value, type) {
            var inst = angular.isString(type) ? $injector.get(type) : type;
            if (!inst) {
                throw new Error('invalid type for isInstanceOf: ' + type);
            }
            if (value !== null && !(value instanceof inst)) {
                var caller = (this.isInstanceOf.caller && this.isInstanceOf.caller.name) || '??';
                throw new Error(caller + ' -> Parameter is not an instance of ' + type + ' and is not null.');
            }
            return this;
        };

        /**
         * @param {number} value
         * @param {string} type
         *
         * @returns {$assert}
         */
        this.isEnum = function (value, type) {
            this.isNumber(value);
            var inst = $injector.get(type);
            if (_.indexOf(_.values(inst), value) === -1) {
                var caller = (this.isEnum.caller && this.isEnum.caller.name) || '??';
                throw new Error(caller + ' -> ENUM of type ' + type + ' does not contain ' + value);
            }
            return this;
        };
    }

    app.service('$assert', [
        '$injector',
        Assert
    ]);

})(angular.module('ngAssert',[]));