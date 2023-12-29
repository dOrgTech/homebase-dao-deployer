"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnv = void 0;
require("dotenv").config();
const getEnv = (envKey) => {
    var _a;
    return (_a = process.env[envKey]) !== null && _a !== void 0 ? _a : "";
};
exports.getEnv = getEnv;
//# sourceMappingURL=env.js.map