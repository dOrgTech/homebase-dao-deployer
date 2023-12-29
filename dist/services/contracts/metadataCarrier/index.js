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
exports.getDAOListMetadata = void 0;
const tzip16_1 = require("@taquito/tzip16");
const baseDAO_1 = require("../baseDAO");
const getDAOListMetadata = (contractAddress, tezos) => __awaiter(void 0, void 0, void 0, function* () {
    const contract = yield (0, baseDAO_1.getContract)(tezos, contractAddress);
    const metadata = yield contract.tzip16().getMetadata();
    const views = yield contract.tzip16().metadataViews();
    const { 1: fa2Map } = yield views.token_metadata().executeView(0);
    return {
        address: contractAddress,
        authors: metadata.metadata.authors || [],
        name: metadata.metadata.name || "",
        description: metadata.metadata.description || "",
        template: metadata.metadata.template,
        unfrozenToken: {
            symbol: (0, tzip16_1.bytes2Char)(fa2Map.get("symbol")),
            name: (0, tzip16_1.bytes2Char)(fa2Map.get("name")),
            decimals: (0, tzip16_1.bytes2Char)(fa2Map.get("decimals"))
        }
    };
});
exports.getDAOListMetadata = getDAOListMetadata;
//# sourceMappingURL=index.js.map