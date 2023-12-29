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
exports.unpackExtraNumValue = exports.calculateCycleInfo = exports.getContract = exports.fromStateToBaseStorage = void 0;
const tzip16_1 = require("@taquito/tzip16");
const bignumber_js_1 = require("bignumber.js");
const dayjs_1 = __importDefault(require("dayjs"));
const michel_codec_1 = require("@taquito/michel-codec");
const isBetween_1 = __importDefault(require("dayjs/plugin/isBetween"));
dayjs_1.default.extend(isBetween_1.default);
const fromStateToBaseStorage = (info) => {
    const proposalFlush = 2 * info.votingSettings.votingBlocks + info.votingSettings.proposalFlushBlocks;
    const expiryPeriod = proposalFlush + info.votingSettings.proposalExpiryBlocks;
    return {
        adminAddress: info.orgSettings.administrator || "",
        governanceToken: {
            address: info.orgSettings.governanceToken.address,
            tokenId: info.orgSettings.governanceToken.tokenId
        },
        guardian: info.orgSettings.guardian,
        extra: {
            frozenExtraValue: new bignumber_js_1.BigNumber(info.votingSettings.proposeStakeRequired),
            slashScaleValue: new bignumber_js_1.BigNumber(100 - info.votingSettings.returnedTokenPercentage),
            minXtzAmount: new bignumber_js_1.BigNumber(info.votingSettings.minXtzAmount),
            maxXtzAmount: new bignumber_js_1.BigNumber(info.votingSettings.maxXtzAmount || 0)
        },
        quorumThreshold: new bignumber_js_1.BigNumber(info.quorumSettings.quorumThreshold),
        votingPeriod: info.votingSettings.votingBlocks || 0,
        minQuorumAmount: new bignumber_js_1.BigNumber(info.quorumSettings.minQuorumAmount),
        maxQuorumAmount: new bignumber_js_1.BigNumber(info.quorumSettings.maxQuorumAmount),
        quorumChange: info.quorumSettings.quorumChange,
        quorumMaxChange: info.quorumSettings.quorumMaxChange,
        proposalFlushPeriod: proposalFlush,
        proposalExpiryPeriod: expiryPeriod
    };
};
exports.fromStateToBaseStorage = fromStateToBaseStorage;
const getContract = (tezos, contractAddress) => __awaiter(void 0, void 0, void 0, function* () {
    return yield tezos.wallet.at(contractAddress, tzip16_1.tzip16);
});
exports.getContract = getContract;
const calculateCycleInfo = (originationTime, votingPeriod) => {
    const current = (0, dayjs_1.default)().unix() - (0, dayjs_1.default)(originationTime).unix();
    const periodLeftPercentage = (current / votingPeriod) % 1;
    const timeLeftPercentage = votingPeriod * periodLeftPercentage;
    const time = votingPeriod - Number(timeLeftPercentage.toFixed());
    const currentPeriodNumber = Math.floor(current / votingPeriod);
    return {
        time: Number(time),
        current: currentPeriodNumber,
        type: currentPeriodNumber % 2 === 0 ? "voting" : "proposing"
    };
};
exports.calculateCycleInfo = calculateCycleInfo;
const unpackExtraNumValue = (bytes) => {
    return new bignumber_js_1.BigNumber((0, michel_codec_1.unpackDataBytes)({ bytes }).int);
};
exports.unpackExtraNumValue = unpackExtraNumValue;
//# sourceMappingURL=utils.js.map