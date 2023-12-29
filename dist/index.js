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
const dayjs_1 = __importDefault(require("dayjs"));
const localizedFormat_1 = __importDefault(require("dayjs/plugin/localizedFormat"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const useTezos_1 = require("./services/beacon/hooks/useTezos");
const deploy_1 = require("./services/contracts/metadataCarrier/deploy");
const baseDAO_1 = require("./services/contracts/baseDAO");
const signer_1 = require("@taquito/signer");
const config_1 = require("./services/config");
const cors_1 = __importDefault(require("cors"));
const connect_timeout_1 = __importDefault(require("connect-timeout")); //express v4
const express_queue_1 = __importDefault(require("express-queue"));
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
// BigNumber.config({ DECIMAL_PLACES:  })
dayjs_1.default.extend(localizedFormat_1.default);
const app = (0, express_1.default)();
const port = 3001;
const ALICE_PRIV_KEY = (0, config_1.getEnv)(config_1.EnvKey.REACT_APP_PRIVATE_KEY);
// parse application/x-www-form-urlencoded
app.use(body_parser_1.default.urlencoded({ extended: false }));
// parse application/json
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)({
    origin: ["https://tezos-homebase.io", "https://deploy-preview-609--tezos-homebase.netlify.app"]
}));
app.use((0, connect_timeout_1.default)(2147483646));
app.use((0, express_queue_1.default)({ activeLimit: 1, queuedLimit: -1 }));
// Certificate
const privateKey = fs_1.default.readFileSync("privkey.pem", "utf8");
const certificate = fs_1.default.readFileSync("cert.pem", "utf8");
const ca = fs_1.default.readFileSync("chain.pem", "utf8");
const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};
app.post("/deploy", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body.deployParams;
        const { metadataParams, params } = body;
        const template = "lambda";
        const network = metadataParams.metadata.frozenToken.governanceToken.tokenMetadata.network;
        const newTezos = (0, useTezos_1.initTezosInstance)(network);
        const signer = yield signer_1.InMemorySigner.fromSecretKey(ALICE_PRIV_KEY);
        newTezos.setProvider({ signer });
        params.orgSettings.administrator = yield newTezos.wallet.pkh();
        const metadata = yield (0, deploy_1.deployMetadataCarrier)(Object.assign(Object.assign({}, metadataParams), { tezos: newTezos, connect: undefined }));
        if (!metadata) {
            throw "No Metadata";
        }
        const contract = yield baseDAO_1.BaseDAO.baseDeploy(template, {
            tezos: newTezos,
            metadata,
            params,
            network
        });
        console.log("contract: ", contract);
        if (!contract) {
            throw new Error(`Error deploying ${template}DAO`);
        }
        const tx = yield baseDAO_1.BaseDAO.transfer_ownership(contract.address, contract.address, newTezos);
        if (!tx) {
            throw new Error(`Error transferring ownership of ${template}DAO to itself`);
        }
        res.send({ address: contract.address });
    }
    catch (error) {
        console.log("error: ", error);
        res.send("OOOppsiess");
    }
}));
const httpsServer = https_1.default.createServer(credentials, app);
httpsServer.listen(port, () => {
    console.log("HTTPS Server running on port", port);
});
//# sourceMappingURL=index.js.map