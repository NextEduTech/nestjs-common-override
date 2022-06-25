"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpException = void 0;
const isString = (val) => typeof val === 'string';
const isUndefined = (obj) => typeof obj === 'undefined';
const isNil = (val) => isUndefined(val) || val === null;
const isObject = (fn) => !isNil(fn) && typeof fn === 'object';
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
        if (isString(this.response)) {
            this.message = this.response;
        }
        else if (isObject(this.response) &&
            isString(this.response.message)) {
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
        return isObject(objectOrError) && !Array.isArray(objectOrError)
            ? objectOrError
            : { statusCode, message: objectOrError, error: description };
    }
}
exports.HttpException = HttpException;
//# sourceMappingURL=HttpException.js.map