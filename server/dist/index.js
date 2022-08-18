"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: '.env' });
const chalk_1 = __importDefault(require("chalk"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const mongo_config_1 = require("./config/mongo.config");
const routes_1 = __importDefault(require("./routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// express app
const app = (0, express_1.default)();
const corsConfig = {
    origin: true,
    credentials: true,
};
app.use((0, cors_1.default)(corsConfig));
app.options('*', (0, cors_1.default)(corsConfig));
// middleware
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// routes
app.use("/", (0, routes_1.default)());
// connect to database
(0, mongo_config_1.initMongoDB)();
// app
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(chalk_1.default.blue(`Server is running on port ${PORT}`));
});
//# sourceMappingURL=index.js.map