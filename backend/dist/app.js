"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const routes_1 = __importDefault(require("./routes/"));
const error_1 = require("./errors/error");
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use(routes_1.default);
app.use(error_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map