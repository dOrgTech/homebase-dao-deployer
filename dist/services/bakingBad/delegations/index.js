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
exports.getLatestDelegation = void 0;
const __1 = require("../../..");
const node_fetch_1 = __importDefault(require("node-fetch"));
const getLatestDelegation = (daoAddress, network) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `https://api.${__1.networkNameMap[network]}.tzkt.io/v1/operations/delegations?sender=${daoAddress}&status=applied`;
    const response = yield (0, node_fetch_1.default)(url);
    if (!response.ok) {
        throw new Error("Failed to fetch delegations from TZKT API");
    }
    const resultingDelegations = yield response.json();
    if (!resultingDelegations.length) {
        return null;
    }
    return resultingDelegations[0];
});
exports.getLatestDelegation = getLatestDelegation;
//# sourceMappingURL=index.js.map