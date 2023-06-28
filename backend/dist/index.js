"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const port = process.env['PORT'] || 3000;
const mongoURL = process.env['MONGODB_URL'] || 'mongodb://127.0.0.1/mypantry';
mongoose_1.default
    .connect(mongoURL, {})
    .then(() => {
    app_1.default.listen(port, () => {
        console.log(`App server is listening on http://localhost:${port}`);
    });
})
    .catch((e) => {
    console.error(`Failed to start server`, e);
});
//# sourceMappingURL=index.js.map