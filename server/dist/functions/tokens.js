"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccessToken = exports.decodeAuthToken = exports.createAuthRefreshToken = exports.createAuthToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const responseMiddleware_1 = require("../middlewares/responseMiddleware");
const createAuthToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_KEY, { expiresIn: "1m" });
};
exports.createAuthToken = createAuthToken;
const createAuthRefreshToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_KEY_REFRESH, { expiresIn: "3d" });
};
exports.createAuthRefreshToken = createAuthRefreshToken;
const decodeAuthToken = (token, key) => {
    try {
        if (token) {
            let decodeKey = '';
            if (key === 'accessToken') {
                decodeKey = process.env.JWT_KEY;
            }
            if (key === 'refreshToken') {
                decodeKey = process.env.JWT_KEY_REFRESH;
            }
            const verify = jsonwebtoken_1.default.verify(token, decodeKey);
            console.log(verify);
            return verify;
        }
        return null;
    }
    catch (error) {
        console.log(error);
    }
};
exports.decodeAuthToken = decodeAuthToken;
const getAccessToken = (authorization) => {
    if (!authorization)
        throw new responseMiddleware_1.ErrorHandler(403, 'Invalid Authorization');
    if (!authorization.startsWith('Bearer '))
        throw new responseMiddleware_1.ErrorHandler(403, 'Invalid Authorization');
    return authorization.split(' ')[1];
};
exports.getAccessToken = getAccessToken;
//# sourceMappingURL=tokens.js.map