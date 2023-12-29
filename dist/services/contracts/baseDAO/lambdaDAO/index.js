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
exports.LambdaDAO = void 0;
const michel_codec_1 = require("@taquito/michel-codec");
const michelson_encoder_1 = require("@taquito/michelson-encoder");
const __1 = require("../../../..");
const tzip16_1 = require("@taquito/tzip16");
const proposelambda_1 = __importDefault(require("./michelson/proposelambda"));
const proposal_1 = require("../../../services/dao/mappers/proposal");
const bignumber_js_1 = require("bignumber.js");
const utils_1 = require("../../utils");
const transfer_proposal_type_json_1 = __importDefault(require("./michelson/supported_lambda_types/transfer_proposal_type.json"));
const transfer_proposal_type_before_fa1_2_json_1 = __importDefault(require("./michelson/supported_lambda_types/transfer_proposal_type_before_fa1.2.json"));
const update_contract_delegate_proposal_json_1 = __importDefault(require("./michelson/supported_lambda_types/update_contract_delegate_proposal.json"));
const update_guardian_proposal_json_1 = __importDefault(require("./michelson/supported_lambda_types/update_guardian_proposal.json"));
const config_1 = require("../../../config");
const parser = new michel_codec_1.Parser();
const mapStorageRegistryList = (listMichelsonString) => {
    const data = (0, michel_codec_1.unpackDataBytes)({
        bytes: listMichelsonString
    });
    return data.map(item => ({
        key: (0, tzip16_1.bytes2Char)(item.args[0].string),
        value: (0, tzip16_1.bytes2Char)(item.args[1].string)
    }));
};
const mapStorageRegistryAffectedList = (listMichelsonString) => {
    const data = (0, michel_codec_1.unpackDataBytes)({
        bytes: listMichelsonString
    });
    return data.map(item => ({
        key: (0, tzip16_1.bytes2Char)(item.args[0].string),
        proposalId: item.args[1].bytes
    }));
};
class LambdaDAO extends __1.BaseDAO {
    constructor(data) {
        super(data);
        this.data = data;
        this.propose = ({ agoraPostId, transfer_proposal }, tezos) => __awaiter(this, void 0, void 0, function* () {
            const contract = yield (0, __1.getContract)(tezos, this.data.address);
            const p = new michel_codec_1.Parser();
            const transfer_michelson = this.data.address === config_1.HUMANITEZ_DAO ? transfer_proposal_type_before_fa1_2_json_1.default : transfer_proposal_type_json_1.default;
            const transfer_arg_schema = new michelson_encoder_1.Schema(transfer_michelson);
            const transfer_proposal_args = {
                transfers: (0, proposal_1.mapTransfersArgs)(transfer_proposal.transfers, this.data.address),
                registry_diff: transfer_proposal.registry_diff.map(item => [(0, tzip16_1.char2Bytes)(item.key), (0, tzip16_1.char2Bytes)(item.value)]),
                agora_post_id: agoraPostId
            };
            const packed_transfer_proposal_arg = (0, michel_codec_1.packDataBytes)(transfer_arg_schema.Encode(transfer_proposal_args) // as MichelsonData
            );
            const proposal_meta_michelson_type = p.parseMichelineExpression(proposelambda_1.default);
            const proposal_meta_schema = new michelson_encoder_1.Schema(proposal_meta_michelson_type);
            const proposalMetadata = (0, michel_codec_1.packDataBytes)(proposal_meta_schema.Encode({
                execute_handler: {
                    handler_name: "transfer_proposal",
                    packed_argument: packed_transfer_proposal_arg.bytes
                }
            }), proposal_meta_michelson_type);
            const contractMethod = contract.methods.propose(yield tezos.wallet.pkh(), (0, utils_1.formatUnits)(new bignumber_js_1.BigNumber(this.data.extra.frozen_extra_value), this.data.token.decimals), proposalMetadata.bytes);
            return yield contractMethod.send();
        });
        this.decoded = {
            decodedRegistry: mapStorageRegistryList(this.data.extra.registry),
            decodedRegistryAffected: mapStorageRegistryAffectedList(this.data.extra.registry_affected)
        };
        this.data.extra.returnedPercentage = new bignumber_js_1.BigNumber(100)
            .minus(new bignumber_js_1.BigNumber(this.data.extra.slash_scale_value))
            .toString();
        this.liteDAOData = data.liteDAO;
    }
    proposeGuardianChange(newGuardianAddress, tezos) {
        return __awaiter(this, void 0, void 0, function* () {
            const contract = yield (0, __1.getContract)(tezos, this.data.address);
            const p = new michel_codec_1.Parser();
            const update_guardian_arg_schema = new michelson_encoder_1.Schema(update_guardian_proposal_json_1.default);
            const packed_transfer_proposal_arg = (0, michel_codec_1.packDataBytes)(update_guardian_arg_schema.Encode(newGuardianAddress) // as MichelsonData
            );
            const proposal_meta_michelson_type = p.parseMichelineExpression(proposelambda_1.default);
            const proposal_meta_schema = new michelson_encoder_1.Schema(proposal_meta_michelson_type);
            const proposalMetadata = (0, michel_codec_1.packDataBytes)(proposal_meta_schema.Encode({
                execute_handler: {
                    handler_name: "update_guardian_proposal",
                    packed_argument: packed_transfer_proposal_arg.bytes
                }
            }), proposal_meta_michelson_type);
            const contractMethod = contract.methods.propose(yield tezos.wallet.pkh(), (0, utils_1.formatUnits)(new bignumber_js_1.BigNumber(this.data.extra.frozen_extra_value), this.data.token.decimals), proposalMetadata.bytes);
            return yield contractMethod.send();
        });
    }
    proposeDelegationChange(newDelegationAddress, tezos) {
        return __awaiter(this, void 0, void 0, function* () {
            const contract = yield (0, __1.getContract)(tezos, this.data.address);
            const p = new michel_codec_1.Parser();
            const transfer_arg_schema = new michelson_encoder_1.Schema(update_contract_delegate_proposal_json_1.default);
            const packed_transfer_proposal_arg = (0, michel_codec_1.packDataBytes)(transfer_arg_schema.Encode(newDelegationAddress) // as MichelsonData
            );
            const proposal_meta_michelson_type = p.parseMichelineExpression(proposelambda_1.default);
            const proposal_meta_schema = new michelson_encoder_1.Schema(proposal_meta_michelson_type);
            const proposalMetadata = (0, michel_codec_1.packDataBytes)(proposal_meta_schema.Encode({
                execute_handler: {
                    handler_name: "update_contract_delegate_proposal",
                    packed_argument: packed_transfer_proposal_arg.bytes
                }
            }), proposal_meta_michelson_type);
            const contractMethod = contract.methods.propose(yield tezos.wallet.pkh(), (0, utils_1.formatUnits)(new bignumber_js_1.BigNumber(this.data.extra.frozen_extra_value), this.data.token.decimals), proposalMetadata.bytes);
            return yield contractMethod.send();
        });
    }
    proposeLambdaExecute({ handler_name, agoraPostId, handler_code, handler_params, lambda_arguments }, tezos) {
        return __awaiter(this, void 0, void 0, function* () {
            const contract = yield (0, __1.getContract)(tezos, this.data.address);
            const p = new michel_codec_1.Parser();
            const transfer_arg_type = JSON.parse(lambda_arguments);
            const transfer_arg_schema = new michelson_encoder_1.Schema(transfer_arg_type);
            const handler_params_object = JSON.parse(handler_params);
            const packed_transfer_proposal_arg = (0, michel_codec_1.packDataBytes)(transfer_arg_schema.Encode(handler_params_object) // as MichelsonData
            );
            const proposal_meta_michelson_type = p.parseMichelineExpression(proposelambda_1.default);
            const proposal_meta_schema = new michelson_encoder_1.Schema(proposal_meta_michelson_type);
            const proposalMetadata = (0, michel_codec_1.packDataBytes)(proposal_meta_schema.Encode({
                execute_handler: {
                    handler_name,
                    packed_argument: packed_transfer_proposal_arg.bytes
                }
            }), proposal_meta_michelson_type);
            const contractMethod = contract.methods.propose(yield tezos.wallet.pkh(), (0, utils_1.formatUnits)(new bignumber_js_1.BigNumber(this.data.extra.frozen_extra_value), this.data.token.decimals), proposalMetadata.bytes);
            return yield contractMethod.send();
        });
    }
    proposeLambdaAdd({ data }, tezos) {
        return __awaiter(this, void 0, void 0, function* () {
            const contract = yield (0, __1.getContract)(tezos, this.data.address);
            const proposalMetadata = yield __1.BaseDAO.encodeLambdaAddMetadata(data, proposelambda_1.default, tezos);
            const contractMethod = contract.methods.propose(yield tezos.wallet.pkh(), (0, utils_1.formatUnits)(new bignumber_js_1.BigNumber(this.data.extra.frozen_extra_value), this.data.token.decimals), proposalMetadata.bytes);
            return yield contractMethod.send();
        });
    }
    proposeLambdaRemove({ handler_name }, tezos) {
        return __awaiter(this, void 0, void 0, function* () {
            const contract = yield (0, __1.getContract)(tezos, this.data.address);
            const michelsonType = parser.parseData(proposelambda_1.default);
            const schema = new michelson_encoder_1.Schema(michelsonType);
            const dataToEncode = {
                remove_handler: handler_name
            };
            const data = schema.Encode(dataToEncode);
            const { packed: proposalMetadata } = yield tezos.rpc.packData({
                data,
                type: michelsonType
            });
            const contractMethod = contract.methods.propose(yield tezos.wallet.pkh(), (0, utils_1.formatUnits)(new bignumber_js_1.BigNumber(this.data.extra.frozen_extra_value), this.data.token.decimals), proposalMetadata);
            return yield contractMethod.send();
        });
    }
}
exports.LambdaDAO = LambdaDAO;
//# sourceMappingURL=index.js.map