"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todos_1 = __importDefault(require("./todos"));
const router = (0, express_1.Router)();
router.use((req, res, next) => {
    console.log(`
  ${req.method} ${req.url}
  Headers: ${req.headers.authorization}
  Body: ${JSON.stringify(req.body)}
  at ${new Date()}`);
    next();
});
router.use('/todos', todos_1.default);
router.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
exports.default = router;
