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
exports.getXTZTransfers = exports.getProposal = exports.getProposals = exports.getDAOs = exports.getDAO = void 0;
const graphql_1 = require("../graphql");
const queries_1 = require("./queries");
const types_1 = require("./mappers/proposal/types");
const dayjs_1 = __importDefault(require("dayjs"));
const getDAO = (address) => __awaiter(void 0, void 0, void 0, function* () {
    return yield graphql_1.client.request(queries_1.GET_DAO_QUERY, {
        address
    });
});
exports.getDAO = getDAO;
const getDAOs = (network) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield graphql_1.client.request(queries_1.GET_DAOS_QUERY, {
        network
    });
    const response_v2 = yield graphql_1.client_v2.request(queries_1.GET_DAOS_QUERY_V2, {
        network
    });
    const daos = response.daos;
    const daos_v2 = response_v2.daos;
    return [...daos, ...daos_v2];
});
exports.getDAOs = getDAOs;
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
//# sourceMappingURL=services.js.map