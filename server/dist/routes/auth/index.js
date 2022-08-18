"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authController_1 = require("../../controllers/authController");
const express_1 = require("express");
const validatorMiddleware_1 = __importDefault(require("../../middlewares/validatorMiddleware"));
const express_validator_1 = require("express-validator");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const authRoutes = () => {
    const router = (0, express_1.Router)();
    router.post("/sign-up", (0, validatorMiddleware_1.default)([
        (0, express_validator_1.check)("email").notEmpty().isEmail(),
        (0, express_validator_1.check)("password").notEmpty().isLength({ min: 6 }).isStrongPassword(),
    ]), authController_1.signUp);
    router.post("/sign-in", (0, validatorMiddleware_1.default)([
        (0, express_validator_1.check)("email").notEmpty().isEmail(),
        (0, express_validator_1.check)("password").notEmpty().isLength({ min: 6 }),
    ]), authController_1.signIn);
    router.get('/refresh', authController_1.refreshAccessToken);
    router.get('/current-user', authMiddleware_1.isAuthenticated, authController_1.currentUser);
    router.get('/log-out', authController_1.logout);
    return router;
};
exports.default = authRoutes;
//# sourceMappingURL=index.js.map