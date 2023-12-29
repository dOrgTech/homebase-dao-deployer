"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NFT = exports.extractQmHash = exports.Token = exports.SUPPORTED_MEDIA_TYPES = exports.SUPPORTED_MIME_TYPES = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
exports.SUPPORTED_MIME_TYPES = [
    "image/jpeg",
    "image/gif",
    "image/png",
    "video/mp4",
    "audio/mpeg",
    "audio/x-wav"
];
exports.SUPPORTED_MEDIA_TYPES = ["image", "audio", "video"];
class Token {
    constructor(params) {
        this.id = params.id;
        this.contract = params.contract;
        this.token_id = params.token_id;
        this.symbol = params.symbol;
        this.name = params.name;
        this.decimals = params.decimals;
        this.network = params.network;
        this.supply = new bignumber_js_1.default(params.supply);
        this.standard = params.standard ? params.standard : "";
    }
}
exports.Token = Token;
const extractQmHash = (ipfsUri) => {
    if (!ipfsUri) {
        return ipfsUri;
    }
    return ipfsUri.startsWith("ipfs://") ? ipfsUri.split("ipfs://")[1] : ipfsUri;
};
exports.extractQmHash = extractQmHash;
const getFormatTag = (mimeType) => {
    if (mimeType.includes("video")) {
        return "video";
    }
    if (mimeType.includes("audio")) {
        return "audio";
    }
    if (mimeType.includes("image")) {
        return "image";
    }
    return "unknown";
};
class NFT extends Token {
    constructor(params) {
        super(params);
        this.thumbnail_hash = (0, exports.extractQmHash)(params.thumbnail_uri);
        this.artifact_hash = (0, exports.extractQmHash)(params.artifact_uri);
        this.description = params.description;
        this.artifact_uri = params.artifact_uri;
        this.thumbnail_uri = params.thumbnail_uri;
        this.is_transferable = params.is_transferable;
        this.tags = params.tags || [];
        this.formats = ["image/jpeg"];
        this.creators = [];
        if (params.creators && params.creators.length) {
            this.firstCreator = params.creators[0];
            this.creators = params.creators;
        }
        if (params.formats) {
            this.formats = params.formats.map(format => exports.SUPPORTED_MIME_TYPES.includes(format.mimeType) ? format.mimeType : "unknown");
        }
        //On BakingBad's APIs, it's simply the first one
        this.preferredFormat = this.formats[0];
        this.mediaType = getFormatTag(this.preferredFormat);
    }
}
exports.NFT = NFT;
//# sourceMappingURL=Token.js.map