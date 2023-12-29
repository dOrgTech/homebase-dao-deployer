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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
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
exports.getDAOLambda = exports.getDAOLambdas = void 0;
const __1 = require("../../..");
const node_fetch_1 = __importDefault(require("node-fetch"));
__exportStar(require("./types"), exports);
__exportStar(require("./constants"), exports);
const getDAOLambdas = (daoId, network) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `https://api.${__1.networkNameMap[network]}.tzkt.io/v1/contracts/${daoId}/bigmaps/extra.lambdas/keys`;
    const response = yield (0, node_fetch_1.default)(url);
    if (!response.ok) {
        throw new Error("Failed to fetch contract storage from BakingBad API");
    }
    const result = yield response.json();
    return result;
});
exports.getDAOLambdas = getDAOLambdas;
const getDAOLambda = (daoId, network, lambda_name) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `https://api.${__1.networkNameMap[network]}.tzkt.io/v1/contracts/${daoId}/bigmaps/extra.lambdas/keys/${lambda_name}`;
    const response = yield (0, node_fetch_1.default)(url);
    if (!response.ok) {
        throw new Error("Failed to fetch contract storage from BakingBad API");
    }
    const result = yield response.json();
    return result;
});
exports.getDAOLambda = getDAOLambda;
//# sourceMappingURL=index.js.map