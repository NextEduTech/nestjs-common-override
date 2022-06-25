"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpException = exports.isObject = exports.isNil = exports.isUndefined = exports.isString = void 0;
const isString = (val) => typeof val === 'string';
exports.isString = isString;
const isUndefined = (obj) => typeof obj === 'undefined';
exports.isUndefined = isUndefined;
const isNil = (val) => (0, exports.isUndefined)(val) || val === null;
exports.isNil = isNil;
const isObject = (fn) => !(0, exports.isNil)(fn) && typeof fn === 'object';
exports.isObject = isObject;
/**
 * Defines the base Nest HTTP exception, which is handled by the default
 * Exceptions Handler.
 *
 * @see [Built-in HTTP exceptions](https://docs.nestjs.com/exception-filters#built-in-http-exceptions)
 *
 * @publicApi
 */
class HttpException extends Error {
    /**
     * Instantiate a plain HTTP Exception.
     *
     * @example
     * `throw new HttpException()`
     *
     * @usageNotes
     * The constructor arguments define the response and the HTTP response status code.
     * - The `response` argument (required) defines the JSON response body.
     * - The `status` argument (required) defines the HTTP Status Code.
     *
     * By default, the JSON response body contains two properties:
     * - `statusCode`: the Http Status Code.
     * - `message`: a short description of the HTTP error by default; override this
     * by supplying a string in the `response` parameter.
     *
     * To override the entire JSON response body, pass an object to the `createBody`
     * method. Nest will serialize the object and return it as the JSON response body.
     *
     * The `status` argument is required, and should be a valid HTTP status code.
     * Best practice is to use the `HttpStatus` enum imported from `nestjs/common`.
     *
     * @param response string or object describing the error condition.
     * @param status HTTP response status code.
     */
    constructor(response, status) {
        super();
        this.response = response;
        this.status = status;
        this.initMessage();
        this.initName();
    }
    initMessage() {
        if ((0, exports.isString)(this.response)) {
            this.message = this.response;
        }
        else if ((0, exports.isObject)(this.response) &&
            (0, exports.isString)(this.response.message)) {
            this.message = this.response.message;
        }
        else if (this.constructor) {
            this.message = this.constructor.name
                .match(/[A-Z][a-z]+|[0-9]+/g)
                .join(' ');
        }
    }
    initName() {
        this.name = this.constructor.name;
    }
    getResponse() {
        return this.response;
    }
    getStatus() {
        return this.status;
    }
    static createBody(objectOrError, description, statusCode) {
        if (!objectOrError) {
            return { statusCode, message: description };
        }
        return (0, exports.isObject)(objectOrError) && !Array.isArray(objectOrError)
            ? objectOrError
            : { statusCode, message: objectOrError, error: description };
    }
}
exports.HttpException = HttpException;
//# sourceMappingURL=HttpException.js.map