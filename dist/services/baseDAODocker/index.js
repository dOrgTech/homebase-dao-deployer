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
exports.generateStorageContract = exports.API_URL = void 0;
const mappers_1 = require("./mappers");
const tokenBalances_1 = require("../bakingBad/tokenBalances");
const config_1 = require("../config");
const node_fetch_1 = __importDefault(require("node-fetch"));
exports.API_URL = (0, config_1.getEnv)(config_1.EnvKey.REACT_APP_BASEDAO_DOCKERISED_URL);
const generateStorageContract = ({ storage, template, originatorAddress, metadata, network, currentLevel }) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenMetadata = yield (0, tokenBalances_1.getTokenMetadata)(storage.governanceToken.address, network, storage.governanceToken.tokenId);
    const args = (0, mappers_1.storageParamsToBaseDAODockerArgs)(storage, metadata, tokenMetadata, currentLevel);
    const url = `${exports.API_URL}/${originatorAddress}/${template}?${Object.keys(args)
        .map(key => `${key}=${args[key]}`)
        .join("&")}`;
    const response = yield (0, node_fetch_1.default)(url);
    if (!response.ok) {
        throw new Error("Failed to make DAO Storage contract from BaseDAO-Dockerized API");
    }
    const result = yield response.json();
    return result.storage;
});
exports.generateStorageContract = generateStorageContract;
//# sourceMappingURL=index.js.map