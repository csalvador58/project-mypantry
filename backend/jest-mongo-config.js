"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    mongodbMemoryServerOptions: {
        binary: {
            version: '6.0.5',
            skipMD5: true,
        },
        autoStart: true,
        instance: {
            dbName: 'jest',
        },
    },
};
