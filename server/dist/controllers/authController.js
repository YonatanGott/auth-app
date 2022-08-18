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
exports.logout = exports.refreshAccessToken = exports.currentUser = exports.signIn = exports.signUp = void 0;
const responseMiddleware_1 = require("../middlewares/responseMiddleware");
const passwords_1 = require("../functions/passwords");
const user_1 = require("../models/users/user");
const tokens_1 = require("../functions/tokens");
// Cookie options
const cookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: 'none',
    // path:'/',
    maxAge: 3 * 24 * 60 * 60 * 1000
};
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, firstName, lastName } = req.body;
        const emailExists = yield user_1.User.findOne({ email: email });
        if (emailExists) {
            throw new responseMiddleware_1.ErrorHandler(404, 'Email already in use');
        }
        const hashedPassword = yield (0, passwords_1.hashPassword)(password);
        const user = yield user_1.User.create({ email, firstName, lastName, password: hashedPassword });
        const token = (0, tokens_1.createAuthToken)(user.id);
        const refreshToken = (0, tokens_1.createAuthRefreshToken)(user.id);
        // Cookie Version
        // res.cookie('jwtAuthApp', refreshToken, cookieOptions);
        // res.status(200).json({ user, token });
        // localStorage  Version
        res.status(200).json({ user, token, refreshToken });
    }
    catch (error) {
        res.status(400).json({ "error": error });
    }
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_1.User.findOne({ email: email });
        if (!user) {
            throw new responseMiddleware_1.ErrorHandler(404, 'Incorrect email');
        }
        const match = (0, passwords_1.verifyPassword)(password, user.password);
        if (!match) {
            throw new responseMiddleware_1.ErrorHandler(404, 'Incorrect password');
        }
        const token = (0, tokens_1.createAuthToken)(user.id);
        const refreshToken = (0, tokens_1.createAuthRefreshToken)(user.id);
        // Cookie Version
        // res.cookie('jwtAuthApp', refreshToken, cookieOptions);
        // res.status(200).json({ user, token });
        // localStorage  Version
        res.status(200).json({ user, token, refreshToken });
    }
    catch (error) {
        res.status(500).json({ "error": error });
    }
});
exports.signIn = signIn;
const currentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.params;
        console.log("req.params", req.params);
        const decoded = (0, tokens_1.decodeAuthToken)(token, "accessToken");
        console.log("decoded", decoded);
        if (!decoded) {
            throw new responseMiddleware_1.ErrorHandler(403, 'Could not refresh access token');
        }
        const user = yield user_1.User.findById(decoded.id);
        if (!user) {
            throw new responseMiddleware_1.ErrorHandler(404, "User not found.");
        }
        console.log("user", user);
        res.status(200).json({ user });
    }
    catch (error) {
        res.status(500).json({ "error": error });
    }
});
exports.currentUser = currentUser;
const refreshAccessToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get the refresh token from cookie
        // const refreshToken = req.cookies.jwtAuthApp as string;
        console.log("req.params", req.params);
        // Get the refresh token from params
        const { refreshToken } = req.params;
        console.log("refreshToken", refreshToken);
        const decoded = (0, tokens_1.decodeAuthToken)(refreshToken, "refreshToken");
        if (!decoded) {
            throw new responseMiddleware_1.ErrorHandler(403, 'Could not refresh access token');
        }
        const user = yield user_1.User.findById(decoded.id);
        if (!user) {
            throw new responseMiddleware_1.ErrorHandler(404, "User not found.");
        }
        const token = (0, tokens_1.createAuthToken)(user.id);
        console.log("token", token);
        res.status(200).json({ user, token });
    }
    catch (error) {
        res.status(500).json({ "error": error });
    }
});
exports.refreshAccessToken = refreshAccessToken;
const logout = (res) => {
    try {
        res.cookie('jwtAuthApp', '', { maxAge: 1 });
    }
    catch (error) {
        res.status(500).json({ "error": error });
    }
};
exports.logout = logout;
//# sourceMappingURL=authController.js.map