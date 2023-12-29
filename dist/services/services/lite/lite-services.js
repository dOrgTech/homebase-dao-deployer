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
exports.fetchLiteData = exports.voteOnLiteProposal = exports.saveLiteProposal = exports.joinLiteCommunity = exports.saveLiteCommunity = exports.getXTZTransfers = exports.getProposal = exports.getProposals = exports.getLiteDAOs = exports.getDAO = void 0;
const graphql_1 = require("../graphql");
const queries_1 = require("../dao/queries");
const types_1 = require("../dao/mappers/proposal/types");
const dayjs_1 = __importDefault(require("dayjs"));
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../../config");
const node_fetch_1 = __importDefault(require("node-fetch"));
const REACT_APP_LITE_API_URL = (0, config_1.getEnv)(config_1.EnvKey.REACT_APP_LITE_API_URL);
const getDAO = (address) => __awaiter(void 0, void 0, void 0, function* () {
    return yield graphql_1.client.request(queries_1.GET_DAO_QUERY, {
        address
    });
});
exports.getDAO = getDAO;
const getLiteDAOs = (network) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.post(`${REACT_APP_LITE_API_URL}/daos/`, {
        network
    });
    const daos = response.data;
    const new_daos = daos.map(dao => {
        const new_dao = {
            dao_type: {
                name: "lite"
            },
            description: dao.description,
            address: dao._id,
            frozen_token_id: dao.tokenID,
            governance_token_id: dao.tokenID,
            name: dao.name,
            network: dao.network,
            token: {
                id: Number(dao.tokenID),
                contract: dao.tokenAddress,
                network: network,
                token_id: Number(dao.tokenID),
                symbol: dao.symbol,
                name: dao.name,
                decimals: Number(dao.decimals),
                standard: dao.tokenType
            }
        };
        return new_dao;
    });
    return [...new_daos];
});
exports.getLiteDAOs = getLiteDAOs;
const getProposals = (dao) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield graphql_1.client.request(queries_1.GET_PROPOSALS_QUERY, {
        address: dao.data.address
    });
    const fetched = response.daos[0];
    let proposals;
    switch (dao.data.type) {
        case "lambda":
            proposals = fetched.proposals.map(proposal => new types_1.LambdaProposal(proposal, dao));
            break;
        default:
            throw new Error(`DAO with address '${dao.data.address}' has an unrecognized type '${dao.data.type}'`);
    }
    return proposals.sort((a, b) => ((0, dayjs_1.default)(b.startDate).isAfter((0, dayjs_1.default)(a.startDate)) ? 1 : -1));
});
exports.getProposals = getProposals;
const getProposal = (address, proposalKey) => __awaiter(void 0, void 0, void 0, function* () {
    return yield graphql_1.client.request(queries_1.GET_PROPOSAL_QUERY, {
        address,
        proposalKey
    });
});
exports.getProposal = getProposal;
const getXTZTransfers = (address) => __awaiter(void 0, void 0, void 0, function* () {
    return yield graphql_1.client.request(queries_1.GET_XTZ_TRANSFERS, {
        address
    });
});
exports.getXTZTransfers = getXTZTransfers;
const saveLiteCommunity = (signature, publicKey, payloadBytes) => __awaiter(void 0, void 0, void 0, function* () {
    const resp = yield (0, node_fetch_1.default)(`${(0, config_1.getEnv)(config_1.EnvKey.REACT_APP_LITE_API_URL)}/dao/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            signature,
            publicKey,
            payloadBytes
        })
    });
    return resp;
});
exports.saveLiteCommunity = saveLiteCommunity;
const joinLiteCommunity = (signature, publicKey, payloadBytes) => __awaiter(void 0, void 0, void 0, function* () {
    const resp = yield (0, node_fetch_1.default)(`${(0, config_1.getEnv)(config_1.EnvKey.REACT_APP_LITE_API_URL)}/daos/join`, {
        method: "POST",
        body: JSON.stringify({
            signature,
            publicKey,
            payloadBytes
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });
    return resp;
});
exports.joinLiteCommunity = joinLiteCommunity;
const saveLiteProposal = (signature, publicKey, payloadBytes) => __awaiter(void 0, void 0, void 0, function* () {
    const resp = yield (0, node_fetch_1.default)(`${(0, config_1.getEnv)(config_1.EnvKey.REACT_APP_LITE_API_URL)}/poll/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            signature,
            publicKey,
            payloadBytes
        })
    });
    return resp;
});
exports.saveLiteProposal = saveLiteProposal;
const voteOnLiteProposal = (signature, publicKey, payloadBytes) => __awaiter(void 0, void 0, void 0, function* () {
    const resp = yield (0, node_fetch_1.default)(`${(0, config_1.getEnv)(config_1.EnvKey.REACT_APP_LITE_API_URL)}/update/choice`, {
        method: "POST",
        body: JSON.stringify({
            signature,
            publicKey,
            payloadBytes
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });
    return resp;
});
exports.voteOnLiteProposal = voteOnLiteProposal;
const fetchLiteData = (daoContract, network) => __awaiter(void 0, void 0, void 0, function* () {
    if (daoContract) {
        const data = yield (0, node_fetch_1.default)(`${(0, config_1.getEnv)(config_1.EnvKey.REACT_APP_LITE_API_URL)}/daos/contracts/${daoContract.toString()}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                network
            })
        });
        const liteData = yield data.json();
        return liteData;
    }
});
exports.fetchLiteData = fetchLiteData;
//# sourceMappingURL=lite-services.js.map