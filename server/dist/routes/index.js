"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//Routes
const auth_1 = __importDefault(require("./auth"));
const router = () => {
    const router = (0, express_1.Router)({ mergeParams: true });
    router.use("/auth", (0, auth_1.default)());
    return router;
};
exports.default = router;
//# sourceMappingURL=index.js.map