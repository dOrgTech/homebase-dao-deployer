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
exports.getUserTokenBalance = exports.getTokenMetadata = exports.getDAONFTBalances = exports.getDAOBalances = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const Token_1 = require("../../../models/Token");
const utils_1 = require("../../contracts/utils");
const __1 = require("../../..");
const node_fetch_1 = __importDefault(require("node-fetch"));
const isNFTDTO = (value) => value.hasOwnProperty("artifact_uri");
const isBalanceTzktNFT = (value) => { var _a; return Boolean((_a = value.token.metadata) === null || _a === void 0 ? void 0 : _a.artifactUri); };
const isTokenTzktNFT = (value) => { var _a; return Boolean((_a = value.metadata) === null || _a === void 0 ? void 0 : _a.artifactUri); };
const ELEMENTS_PER_REQUEST = 50;
const getDAOBalances = (daoId, network, offset = 0, balances = []) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `https://api.${__1.networkNameMap[network]}.tzkt.io/v1/tokens/balances?account=${daoId}&limit=${ELEMENTS_PER_REQUEST}&offset=${offset}&token.metadata.artifactUri.null=true`;
    const response = yield (0, node_fetch_1.default)(url);
    if (!response.ok) {
        throw new Error("Failed to fetch contract storage from BakingBad API");
    }
    const result = yield response.json();
    if (result.length === 0) {
        return balances;
    }
    const tokenBalances = yield Promise.all(result.map((balance) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        const tokenData = balance.token;
        const tokenBalance = {
            id: balance.token.id.toString(),
            supply: tokenData.totalSupply,
            contract: balance.token.contract.address,
            token_id: parseInt(balance.token.tokenId),
            network: network,
            symbol: ((_a = tokenData.metadata) === null || _a === void 0 ? void 0 : _a.symbol) || "",
            level: balance.firstLevel,
            name: ((_b = tokenData.metadata) === null || _b === void 0 ? void 0 : _b.name) || "",
            decimals: parseInt((_c = tokenData.metadata) === null || _c === void 0 ? void 0 : _c.decimals) || 0,
            balance: balance.balance,
            standard: tokenData.standard
        };
        return tokenBalance;
    })));
    const fetchedBalances = tokenBalances.map(daoTokenDTO => {
        return {
            balance: (0, utils_1.parseUnits)(new bignumber_js_1.default(daoTokenDTO.balance), daoTokenDTO.decimals),
            token: new Token_1.Token(daoTokenDTO)
        };
    });
    return (0, exports.getDAOBalances)(daoId, network, offset + ELEMENTS_PER_REQUEST, balances.concat(fetchedBalances));
});
exports.getDAOBalances = getDAOBalances;
const getDAONFTBalances = (daoId, network, offset = 0, balances = []) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `https://api.${__1.networkNameMap[network]}.tzkt.io/v1/tokens/balances?account=${daoId}&limit=${ELEMENTS_PER_REQUEST}&offset=${offset}&token.metadata.artifactUri.null=false`;
    const response = yield (0, node_fetch_1.default)(url);
    if (!response.ok) {
        throw new Error("Failed to fetch contract storage from BakingBad API");
    }
    const result = yield response.json();
    if (result.length === 0) {
        return balances;
    }
    const tokenBalances = yield Promise.all(result.map((balance) => __awaiter(void 0, void 0, void 0, function* () {
        var _d, _e, _f, _g, _h, _j, _k, _l, _m;
        const tokenData = balance.token;
        const tokenBalance = {
            id: balance.token.id.toString(),
            supply: tokenData.totalSupply,
            contract: balance.token.contract.address,
            token_id: parseInt(balance.token.tokenId),
            network: network,
            symbol: ((_d = tokenData.metadata) === null || _d === void 0 ? void 0 : _d.symbol) || "",
            level: balance.firstLevel,
            name: ((_e = tokenData.metadata) === null || _e === void 0 ? void 0 : _e.name) || "",
            decimals: parseInt((_f = tokenData.metadata) === null || _f === void 0 ? void 0 : _f.decimals) || 0,
            description: ((_g = tokenData.metadata) === null || _g === void 0 ? void 0 : _g.description) || "",
            artifact_uri: ((_h = tokenData.metadata) === null || _h === void 0 ? void 0 : _h.artifactUri) || "",
            thumbnail_uri: ((_j = tokenData.metadata) === null || _j === void 0 ? void 0 : _j.thumbnailUri) || "",
            is_transferable: (_k = tokenData.metadata) === null || _k === void 0 ? void 0 : _k.isTransferable,
            creators: ((_l = tokenData.metadata) === null || _l === void 0 ? void 0 : _l.creators) || [],
            tags: ((_m = tokenData.metadata) === null || _m === void 0 ? void 0 : _m.tags) || [],
            formats: tokenData.metadata.formats || [
                {
                    mimeType: "",
                    uri: ""
                }
            ],
            balance: balance.balance,
            standard: tokenData.standard
        };
        return tokenBalance;
    })));
    const fetchedBalances = tokenBalances.map(daoTokenDTO => {
        return {
            balance: (0, utils_1.parseUnits)(new bignumber_js_1.default(daoTokenDTO.balance), daoTokenDTO.decimals),
            token: new Token_1.NFT(daoTokenDTO)
        };
    });
    return (0, exports.getDAONFTBalances)(daoId, network, offset + ELEMENTS_PER_REQUEST, balances.concat(fetchedBalances));
});
exports.getDAONFTBalances = getDAONFTBalances;
const getTokenMetadata = (contractAddress, network, tokenId) => __awaiter(void 0, void 0, void 0, function* () {
    var _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z;
    let url = "";
    if (tokenId !== undefined) {
        url = `https://api.${__1.networkNameMap[network]}.tzkt.io/v1/tokens?contract=${contractAddress}&tokenId=${tokenId}`;
    }
    else {
        url = `https://api.${__1.networkNameMap[network]}.tzkt.io/v1/tokens?contract=${contractAddress}`;
    }
    const response = yield (0, node_fetch_1.default)(url);
    if (!response.ok) {
        throw new Error("Failed to fetch proposals from BakingBad API");
    }
    const resultTokenDataTzkt = yield response.json();
    const tokenData = resultTokenDataTzkt[0];
    let result;
    if (isTokenTzktNFT(tokenData)) {
        result = {
            id: tokenData.id.toString(),
            supply: tokenData.totalSupply,
            contract: tokenData.contract.address,
            token_id: parseInt(tokenData.tokenId),
            network: network,
            symbol: ((_o = tokenData.metadata) === null || _o === void 0 ? void 0 : _o.symbol) || "",
            level: tokenData.firstLevel,
            name: ((_p = tokenData.metadata) === null || _p === void 0 ? void 0 : _p.name) || "",
            decimals: parseInt((_q = tokenData.metadata) === null || _q === void 0 ? void 0 : _q.decimals) || 0,
            description: ((_r = tokenData.metadata) === null || _r === void 0 ? void 0 : _r.description) || "",
            artifact_uri: ((_s = tokenData.metadata) === null || _s === void 0 ? void 0 : _s.artifactUri) || "",
            thumbnail_uri: ((_t = tokenData.metadata) === null || _t === void 0 ? void 0 : _t.thumbnailUri) || "",
            is_transferable: tokenData.metadata.isTransferable,
            creators: (_u = tokenData.metadata) === null || _u === void 0 ? void 0 : _u.creators,
            tags: (_v = tokenData.metadata) === null || _v === void 0 ? void 0 : _v.tags,
            formats: (_w = tokenData.metadata) === null || _w === void 0 ? void 0 : _w.formats,
            balance: "",
            standard: tokenData.standard
        };
    }
    else {
        result = {
            id: tokenData.id.toString(),
            supply: tokenData.totalSupply,
            contract: tokenData.contract.address,
            token_id: parseInt(tokenData.tokenId),
            network: network,
            symbol: ((_x = tokenData.metadata) === null || _x === void 0 ? void 0 : _x.symbol) || "",
            level: tokenData.firstLevel,
            name: ((_y = tokenData.metadata) === null || _y === void 0 ? void 0 : _y.name) || "",
            decimals: parseInt((_z = tokenData.metadata) === null || _z === void 0 ? void 0 : _z.decimals) || 0,
            balance: "",
            standard: tokenData.standard
        };
    }
    return isNFTDTO(result) ? new Token_1.NFT(result) : new Token_1.Token(result);
});
exports.getTokenMetadata = getTokenMetadata;
const getUserTokenBalance = (accountAddress, network = "mainnet", tokenAddress = "") => __awaiter(void 0, void 0, void 0, function* () {
    const url = `https://api.${__1.networkNameMap[network]}.tzkt.io/v1/tokens/balances/?account=${accountAddress}&token.contract=${tokenAddress}`;
    const response = yield (0, node_fetch_1.default)(url);
    if (!response.ok) {
        throw new Error("Failed to fetch user balances");
    }
    const userTokenBalance = yield response.json();
    if (userTokenBalance && userTokenBalance[0]) {
        return userTokenBalance[0].balance;
    }
});
exports.getUserTokenBalance = getUserTokenBalance;
//# sourceMappingURL=index.js.map