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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployMetadataCarrier = void 0;
const taquito_1 = require("@taquito/taquito");
const tzip16_1 = require("@taquito/tzip16");
const code_1 = require("./code");
const metadata_1 = require("./metadata");
const setMetadataMap = (keyName, metadata) => {
    const map = new taquito_1.MichelsonMap();
    const json = (0, metadata_1.setMetadataJSON)(metadata);
    map.set(keyName, (0, tzip16_1.char2Bytes)(JSON.stringify(json)));
    return map;
};
const deployMetadataCarrier = ({ keyName, metadata, tezos }) => __awaiter(void 0, void 0, void 0, function* () {
    const metadataMap = setMetadataMap(keyName, metadata);
    try {
        console.log("Originating Metadata Carrier contract...");
        const t = tezos.wallet.originate({
            code: code_1.code,
            storage: {
                metadata: metadataMap
            }
        });
        console.log("Waiting for confirmation on Metadata Carrier contract...", t);
        const c = yield t.send();
        const contract = yield c.contract();
        console.log("Metadata Carrier deployment completed", c);
        return { contract, keyName, deployAddress: contract.address };
    }
    catch (e) {
        // This should be handled above!
        if (e.name === "UnconfiguredSignerError") {
            // If this happens its because the user is not connected to any wallet
            // Let's connect to a wallet provider and trigger the deployment method again
        }
        if (e instanceof Error) {
            const error = e;
            console.log(error.name + ": " + error.message + "\n" + error.stack);
        }
        else {
            console.log(e);
        }
    }
});
exports.deployMetadataCarrier = deployMetadataCarrier;
//# sourceMappingURL=deploy.js.map