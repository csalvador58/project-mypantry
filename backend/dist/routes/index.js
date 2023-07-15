"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = __importDefault(require("./auth.route"));
const pantry_route_1 = __importDefault(require("./pantry.route"));
const reqLogger_route_1 = __importDefault(require("../utils/reqLogger.route"));
const sales_route_1 = __importDefault(require("./sales.route"));
const router = (0, express_1.Router)();
const defaultIRoute = [
    {
        path: '/',
        route: reqLogger_route_1.default,
    },
    {
        path: '/auth',
        route: auth_route_1.default,
    },
    {
        path: '/pantry',
        route: pantry_route_1.default,
    },
    {
        path: '/sales',
        route: sales_route_1.default,
    },
];
defaultIRoute.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
//# sourceMappingURL=index.js.map