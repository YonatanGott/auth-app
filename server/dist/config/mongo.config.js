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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initMongoDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const chalk_1 = __importDefault(require("chalk"));
const mongoUrl = process.env.MONGO_URL || "localhost";
const dbName = 'Auth';
const initMongoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(`mongodb://${mongoUrl}/${dbName}`, () => console.log(chalk_1.default.blue('Connected to MongoDB')));
    }
    catch (error) {
        console.log(chalk_1.default.red(`Can't connect to Database : ${error}`));
    }
});
exports.initMongoDB = initMongoDB;
const mongo = mongoose_1.default.connection;
exports.default = mongo;
//# sourceMappingURL=mongo.config.js.map