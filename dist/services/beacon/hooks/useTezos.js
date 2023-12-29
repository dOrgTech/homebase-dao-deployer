"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initTezosInstance = void 0;
const taquito_1 = require("@taquito/taquito");
const beacon_1 = require("./..");
const tzip16_1 = require("@taquito/tzip16");
const initTezosInstance = (network) => {
    const newTezos = new taquito_1.TezosToolkit(beacon_1.rpcNodes[network]);
    newTezos.setPackerProvider(new taquito_1.MichelCodecPacker());
    newTezos.addExtension(new tzip16_1.Tzip16Module());
    return newTezos;
};
exports.initTezosInstance = initTezosInstance;
//# sourceMappingURL=useTezos.js.map