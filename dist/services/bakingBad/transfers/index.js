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
exports.getDAOTransfers = void 0;
const __1 = require("../../..");
const node_fetch_1 = __importDefault(require("node-fetch"));
const ELEMENTS_PER_REQUEST = 20;
const getDAOTransfers = (daoId, network) => __awaiter(void 0, void 0, void 0, function* () {
    const urlTo = `https://api.${__1.networkNameMap[network]}.tzkt.io/v1/tokens/transfers?to=${daoId}&limit=${ELEMENTS_PER_REQUEST}`;
    const responseTo = yield (0, node_fetch_1.default)(urlTo);
    if (!responseTo.ok) {
        throw new Error("Failed to fetch contract storage from BakingBad API");
    }
    const resultsTzktTo = yield responseTo.json();
    const urlFrom = `https://api.${__1.networkNameMap[network]}.tzkt.io/v1/tokens/transfers?from=${daoId}&limit=${ELEMENTS_PER_REQUEST}`;
    const responseFrom = yield (0, node_fetch_1.default)(urlFrom);
    if (!responseFrom.ok) {
        throw new Error("Failed to fetch contract storage from BakingBad API");
    }
    const resultsTzktFrom = yield responseFrom.json();
    const resultsTzktAggregated = resultsTzktTo.concat(resultsTzktFrom);
    const transfers = yield Promise.all(resultsTzktAggregated.map((result) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        const urlId = `https://api.${__1.networkNameMap[network]}.tzkt.io/v1/operations/transactions?id=${result.transactionId}`;
        const responseId = yield (0, node_fetch_1.default)(urlId);
        const resultTzktTxResult = yield responseId.json();
        const resultTzktTx = resultTzktTxResult[0];
        const transferDTO = {
            indexed_time: resultTzktTx.id,
            network: network,
            contract: result.token.contract.address,
            initiator: "",
            hash: resultTzktTx.hash,
            status: resultTzktTx.status,
            timestamp: result.timestamp,
            level: result.level,
            from: result.from.address,
            to: result.to.address,
            token_id: parseInt(result.token.tokenId),
            amount: result.amount,
            counter: resultTzktTx.counter,
            token: {
                contract: result.token.contract.address,
                network: network,
                token_id: parseInt(result.token.tokenId),
                symbol: ((_a = result.token.metadata) === null || _a === void 0 ? void 0 : _a.symbol) || "",
                name: ((_b = result.token.metadata) === null || _b === void 0 ? void 0 : _b.name) || "",
                decimals: parseInt(((_c = result.token.metadata) === null || _c === void 0 ? void 0 : _c.decimals) || "0")
            },
            alias: ((_d = result.token.metadata) === null || _d === void 0 ? void 0 : _d.name) || "",
            to_alias: ""
        };
        return transferDTO;
    })));
    const result = {
        transfers: transfers,
        total: transfers.length
    };
    return result.transfers;
});
exports.getDAOTransfers = getDAOTransfers;
//# sourceMappingURL=index.js.map