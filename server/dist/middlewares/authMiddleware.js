"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const tokens_1 = require("../functions/tokens");
const user_1 = require("../models/users/user");
const responseMiddleware_1 = require("./responseMiddleware");
const isAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = (0, tokens_1.getAccessToken)(req.headers.authorization);
        console.log("accessToken", accessToken);
        const authToken = (0, tokens_1.decodeAuthToken)(accessToken, 'accessToken');
        console.log("authToken", authToken);
        if (!authToken) {
            throw new responseMiddleware_1.ErrorHandler(403, "Invalid access token");
        }
        const existingUser = yield user_1.User.findById(authToken.id);
        if (!existingUser) {
            throw new responseMiddleware_1.ErrorHandler(404, "User not found.");
        }
        return next();
    }
    catch (error) {
        res.status(403).json({ "error": error });
    }
});
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=authMiddleware.js.map