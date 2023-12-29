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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseDAO = void 0;
const _1 = require(".");
const baseDAODocker_1 = require("../../baseDAODocker");
const lambdaDAO_1 = __importDefault(require("./michelson/lambdaDAO"));
const utils_1 = require("../utils");
const bignumber_js_1 = require("bignumber.js");
const michel_codec_1 = require("@taquito/michel-codec");
const michelson_encoder_1 = require("@taquito/michelson-encoder");
const configuration_proposal_type_json_1 = __importDefault(require("./lambdaDAO/michelson/supported_lambda_types/configuration_proposal_type.json"));
const proposelambda_1 = __importDefault(require("./lambdaDAO/michelson/proposelambda"));
const stats_1 = require("../../bakingBad/stats");
class BaseDAO {
    constructor(data) {
        this.data = data;
        this.flush = (numerOfProposalsToFlush, expiredProposalIds, tezos) => __awaiter(this, void 0, void 0, function* () {
            const daoContract = yield (0, _1.getContract)(tezos, this.data.address);
            const initialBatch = yield tezos.wallet.batch();
            const batch = expiredProposalIds.reduce((prev, current) => {
                return prev.withContractCall(daoContract.methods.drop_proposal(current));
            }, initialBatch);
            batch.withContractCall(daoContract.methods.flush(numerOfProposalsToFlush));
            return yield batch.send();
        });
        this.dropProposal = (proposalId, tezos) => __awaiter(this, void 0, void 0, function* () {
            const contract = yield (0, _1.getContract)(tezos, this.data.address);
            return yield contract.methods.drop_proposal(proposalId).send();
        });
        this.dropAllExpired = (expiredProposalIds, tezos) => __awaiter(this, void 0, void 0, function* () {
            const daoContract = yield (0, _1.getContract)(tezos, this.data.address);
            const initialBatch = yield tezos.wallet.batch();
            const batch = expiredProposalIds.reduce((prev, current) => {
                return prev.withContractCall(daoContract.methods.drop_proposal(current));
            }, initialBatch);
            return yield batch.send();
        });
        this.unstakeFromAllProposals = (proposals, account, tezos) => __awaiter(this, void 0, void 0, function* () {
            const daoContract = yield (0, _1.getContract)(tezos, this.data.address);
            const initialBatch = yield tezos.wallet.batch();
            const batch = proposals.reduce((prev, current) => {
                return prev.withContractCall(daoContract.methods.unstake_vote([current]));
            }, initialBatch);
            return yield batch.send();
        });
        this.sendXtz = (xtzAmount, tezos) => __awaiter(this, void 0, void 0, function* () {
            const contract = yield (0, _1.getContract)(tezos, this.data.address);
            return yield contract.methods.callCustom("receive_xtz", "").send({
                amount: (0, utils_1.xtzToMutez)(xtzAmount).toNumber(),
                mutez: true
            });
        });
        this.vote = ({ proposalKey, amount, support, tezos }) => __awaiter(this, void 0, void 0, function* () {
            const contract = yield (0, _1.getContract)(tezos, this.data.address);
            return yield contract.methods
                .vote([
                {
                    argument: {
                        from: yield tezos.wallet.pkh(),
                        proposal_key: proposalKey,
                        vote_type: support,
                        vote_amount: (0, utils_1.formatUnits)(amount, this.data.token.decimals).toString()
                    }
                }
            ])
                .send();
        });
        this.freeze = (amount, tezos) => __awaiter(this, void 0, void 0, function* () {
            const daoContract = yield (0, _1.getContract)(tezos, this.data.address);
            const govTokenContract = yield (0, _1.getContract)(tezos, this.data.token.contract);
            const tokenMetadata = this.data.token;
            const batch = yield tezos.wallet
                .batch()
                .withContractCall(govTokenContract.methods.update_operators([
                {
                    add_operator: {
                        owner: yield tezos.wallet.pkh(),
                        operator: this.data.address,
                        token_id: this.data.token.token_id
                    }
                }
            ]))
                .withContractCall(daoContract.methods.freeze((0, utils_1.formatUnits)(amount, tokenMetadata.decimals).toString()))
                .withContractCall(govTokenContract.methods.update_operators([
                {
                    remove_operator: {
                        owner: yield tezos.wallet.pkh(),
                        operator: this.data.address,
                        token_id: this.data.token.token_id
                    }
                }
            ]));
            return yield batch.send();
        });
        this.unfreeze = (amount, tezos) => __awaiter(this, void 0, void 0, function* () {
            const contract = yield (0, _1.getContract)(tezos, this.data.address);
            return yield contract.methods.unfreeze((0, utils_1.formatUnits)(amount, this.data.token.decimals).toString()).send();
        });
        this.unstakeVotes = (proposalId, tezos) => __awaiter(this, void 0, void 0, function* () {
            const contract = yield (0, _1.getContract)(tezos, this.data.address);
            return yield contract.methods.unstake_vote([proposalId]).send();
        });
    }
    static encodeProposalMetadata(dataToEncode, michelsonSchemaString, tezos) {
        return __awaiter(this, void 0, void 0, function* () {
            const parser = new michel_codec_1.Parser();
            const michelsonType = parser.parseData(michelsonSchemaString);
            const schema = new michelson_encoder_1.Schema(michelsonType);
            const data = schema.Encode(dataToEncode);
            const { packed } = yield tezos.rpc.packData({
                data,
                type: michelsonType
            });
            return packed;
        });
    }
    static encodeLambdaAddMetadata(dataToEncode, michelsonSchemaString, tezos) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("michelsonSchemaString: ", michelsonSchemaString);
            console.log("dataToEncode: ", dataToEncode);
            const parser = new michel_codec_1.Parser();
            const dataJSON = parser.parseMichelineExpression(dataToEncode);
            const typeJSON = parser.parseMichelineExpression(michelsonSchemaString);
            const packed = (0, michel_codec_1.packDataBytes)(dataJSON, // as MichelsonData
            typeJSON // as MichelsonType
            );
            return packed;
        });
    }
    proposeConfigChange(configParams, tezos) {
        return __awaiter(this, void 0, void 0, function* () {
            const contract = yield (0, _1.getContract)(tezos, this.data.address);
            const p = new michel_codec_1.Parser();
            const configuration_arg_schema = new michelson_encoder_1.Schema(configuration_proposal_type_json_1.default);
            let formatted_frozen_extra_value;
            if (configParams.frozen_extra_value) {
                formatted_frozen_extra_value = (0, utils_1.formatUnits)(new bignumber_js_1.BigNumber(configParams.frozen_extra_value.toString()), this.data.token.decimals).toString();
            }
            const configuration_proposal_args = {
                frozen_extra_value: formatted_frozen_extra_value,
                slash_scale_value: configParams.slash_scale_value
            };
            console.log("configuration_proposal_args: ", configuration_proposal_args);
            const packed_configuration_proposal_arg = (0, michel_codec_1.packDataBytes)(configuration_arg_schema.Encode(configuration_proposal_args) // as MichelsonData
            );
            const proposal_meta_michelson_type = p.parseMichelineExpression(proposelambda_1.default);
            const proposal_meta_schema = new michelson_encoder_1.Schema(proposal_meta_michelson_type);
            const proposalMetadata = (0, michel_codec_1.packDataBytes)(proposal_meta_schema.Encode({
                execute_handler: {
                    handler_name: "configuration_proposal",
                    packed_argument: packed_configuration_proposal_arg.bytes
                }
            }), proposal_meta_michelson_type);
            const contractMethod = contract.methods.propose(yield tezos.wallet.pkh(), (0, utils_1.formatUnits)(new bignumber_js_1.BigNumber(this.data.extra.frozen_extra_value), this.data.token.decimals), proposalMetadata.bytes);
            return yield contractMethod.send();
        });
    }
}
exports.BaseDAO = BaseDAO;
_a = BaseDAO;
BaseDAO.baseDeploy = (template, { params, metadata, tezos, network }) => __awaiter(void 0, void 0, void 0, function* () {
    const treasuryParams = (0, _1.fromStateToBaseStorage)(params);
    if (!metadata.deployAddress) {
        throw new Error("Error deploying treasury DAO: There's not address of metadata");
    }
    const account = yield tezos.wallet.pkh();
    try {
        console.log("Making storage contract...");
        const currentLevel = yield (0, stats_1.getNetworkHead)(network);
        const storageCode = yield (0, baseDAODocker_1.generateStorageContract)({
            network,
            template,
            storage: treasuryParams,
            originatorAddress: account,
            metadata,
            currentLevel
        });
        console.log("Originating DAO contract...");
        const contractMichaelson = lambdaDAO_1.default;
        console.log(contractMichaelson);
        console.log(treasuryParams);
        console.log(storageCode);
        const t = tezos.wallet.originate({
            code: contractMichaelson,
            init: storageCode
        });
        console.log("t: ", t);
        const operation = yield t.send();
        console.log("operation: ", operation);
        console.log("Waiting for confirmation on DAO contract...", t);
        const { address } = yield operation.contract();
        return tezos.wallet.at(address);
    }
    catch (e) {
        console.log("error ", e);
        throw new Error("Error deploying DAO");
    }
});
BaseDAO.transfer_ownership = (newOwner, address, tezos) => __awaiter(void 0, void 0, void 0, function* () {
    const contract = yield (0, _1.getContract)(tezos, address);
    return contract.methods.transfer_ownership(newOwner).send();
});
//# sourceMappingURL=class.js.map