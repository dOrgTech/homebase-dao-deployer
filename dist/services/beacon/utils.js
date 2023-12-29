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
exports.connectWithBeacon = exports.getNetworkTypeByEnvNetwork = exports.createTezos = exports.createWallet = exports.getTezosNetwork = exports.rpcNodes = exports.ALICE_PRIV_KEY = void 0;
const beacon_types_1 = require("@airgap/beacon-types");
const beacon_wallet_1 = require("@taquito/beacon-wallet");
const taquito_1 = require("@taquito/taquito");
const tzip16_1 = require("@taquito/tzip16");
const config_1 = require("../config");
exports.ALICE_PRIV_KEY = "edsk3QoqBuvdamxouPhin7swCvkQNgq4jP5KZPbwWNnwdZpSpJiEbq";
exports.rpcNodes = {
    mainnet: "https://mainnet.api.tez.ie",
    ghostnet: "https://ghostnet.tezos.marigold.dev"
};
const getTezosNetwork = () => {
    const envNetwork = (0, config_1.getEnv)(config_1.EnvKey.REACT_APP_NETWORK).toString().toLowerCase();
    if (!envNetwork) {
        throw new Error("No Network ENV set");
    }
    return envNetwork;
};
exports.getTezosNetwork = getTezosNetwork;
let beaconWallet;
const createWallet = (network) => {
    if (!beaconWallet) {
        beaconWallet = new beacon_wallet_1.BeaconWallet({
            name: "Homebase",
            iconUrl: "https://tezostaquito.io/img/favicon.png",
            preferredNetwork: network,
            walletConnectOptions: {
                projectId: "1641355e825aeaa926e843dd38b04f6f",
                relayUrl: "wss://relay.walletconnect.com" // WC2 relayUrl can be customised
            }
        });
    }
    return beaconWallet;
};
exports.createWallet = createWallet;
const createTezos = (network) => {
    const tezos = new taquito_1.TezosToolkit(exports.rpcNodes[network]);
    tezos.setPackerProvider(new taquito_1.MichelCodecPacker());
    tezos.addExtension(new tzip16_1.Tzip16Module());
    return tezos;
};
exports.createTezos = createTezos;
const getNetworkTypeByEnvNetwork = (envNetwork) => {
    switch (envNetwork) {
        case "ghostnet":
            return beacon_types_1.NetworkType.GHOSTNET;
        case "mainnet":
            return beacon_types_1.NetworkType.MAINNET;
        default:
            return beacon_types_1.NetworkType.MAINNET;
    }
};
exports.getNetworkTypeByEnvNetwork = getNetworkTypeByEnvNetwork;
const connectWithBeacon = (envNetwork) => __awaiter(void 0, void 0, void 0, function* () {
    const networkType = (0, exports.getNetworkTypeByEnvNetwork)(envNetwork);
    const wallet = (0, exports.createWallet)(envNetwork);
    yield wallet.requestPermissions({
        network: {
            type: networkType
        }
    });
    const accounts = JSON.parse(localStorage.getItem("beacon:accounts"));
    const network = accounts[0].network.type;
    return {
        network,
        wallet
    };
});
exports.connectWithBeacon = connectWithBeacon;
//# sourceMappingURL=utils.js.map