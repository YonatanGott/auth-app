"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.logError = exports.ErrorHandler = void 0;
const chalk_1 = __importDefault(require("chalk"));
class ErrorHandler {
    constructor(statusCode, data) {
        this.statusCode = null;
        this.statusCode = statusCode;
        if (typeof data === 'string') {
            this.message = data;
        }
        if (typeof data === 'object') {
            this.message = data.message;
            this.data = data.data;
        }
    }
}
exports.ErrorHandler = ErrorHandler;
const logError = (response, routeName) => {
    console.log(chalk_1.default.red(`${chalk_1.default.white.bgRed.bold(` ${response.statusCode} `)} ${response.message} on ${routeName}`));
};
exports.logError = logError;
const handleError = (err, req, res, next) => {
    const { statusCode: statusCodeFromErr, message, data } = err;
    const statusCode = statusCodeFromErr || 500;
    const response = {
        status: 'error',
        statusCode,
        message,
        data,
    };
    (0, exports.logError)(response, req.originalUrl);
    return res.status(statusCode).json(response);
};
exports.handleError = handleError;
//# sourceMappingURL=responseMiddleware.js.map