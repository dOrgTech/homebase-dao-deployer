"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlockie = exports.formatUnits = exports.parseUnits = exports.xtzToMutez = exports.mutezToXtz = exports.toShortAddress = exports.stringToHex = void 0;
const bignumber_js_1 = require("bignumber.js");
const blockies_ts_1 = __importDefault(require("blockies-ts"));
const stringToHex = (value) => {
    let result = "";
    for (let i = 0; i < value.length; i++) {
        result += value.charCodeAt(i).toString(16).slice(-4);
    }
    return result;
};
exports.stringToHex = stringToHex;
const toShortAddress = (address, limit = 4) => {
    return address
        .slice(0, limit)
        .concat("...")
        .concat(address.slice(address.length - limit, address.length));
};
exports.toShortAddress = toShortAddress;
const mutezToXtz = (mutez) => {
    return (0, exports.parseUnits)(mutez, 6);
};
exports.mutezToXtz = mutezToXtz;
const xtzToMutez = (xtz) => {
    return (0, exports.formatUnits)(xtz, 6);
};
exports.xtzToMutez = xtzToMutez;
const parseUnits = (amount, decimals) => {
    return amount.div(new bignumber_js_1.BigNumber(10).pow(decimals));
};
exports.parseUnits = parseUnits;
const formatUnits = (amount, decimals) => {
    return amount.multipliedBy(new bignumber_js_1.BigNumber(10).pow(decimals));
};
exports.formatUnits = formatUnits;
const b582int = (val) => {
    let rv = new bignumber_js_1.BigNumber(0);
    const alpha = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
    for (let i = 0; i < val.length; i++) {
        rv = rv.plus(new bignumber_js_1.BigNumber(alpha.indexOf(val[val.length - 1 - i])).multipliedBy(new bignumber_js_1.BigNumber(alpha.length).exponentiatedBy(i)));
    }
    return rv.toString(16);
};
const getBlockie = (address) => {
    if (address.startsWith("tz") || address.startsWith("kt")) {
        return blockies_ts_1.default
            .create({
            seed: `0${b582int(address)}`,
            spotcolor: "#000"
        })
            .toDataURL();
    }
    return blockies_ts_1.default.create({ seed: address }).toDataURL();
};
exports.getBlockie = getBlockie;
//# sourceMappingURL=utils.js.map