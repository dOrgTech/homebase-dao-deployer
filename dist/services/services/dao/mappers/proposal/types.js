"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LambdaProposal = exports.Proposal = exports.ProposalStatus = exports.IndexerStatus = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const dayjs_1 = __importDefault(require("dayjs"));
const proposelambda_1 = __importDefault(require("../../../../contracts/baseDAO/lambdaDAO/michelson/proposelambda"));
const michelson_encoder_1 = require("@taquito/michelson-encoder");
const michel_codec_1 = require("@taquito/michel-codec");
const utils_1 = require("../../../../contracts/utils");
const _1 = require(".");
const tzip16_1 = require("@taquito/tzip16");
const transfer_proposal_type_json_1 = __importDefault(require("../../../../contracts/baseDAO/lambdaDAO/michelson/supported_lambda_types/transfer_proposal_type.json"));
const transfer_proposal_type_before_fa1_2_json_1 = __importDefault(require("../../../../contracts/baseDAO/lambdaDAO/michelson/supported_lambda_types/transfer_proposal_type_before_fa1.2.json"));
const update_contract_delegate_proposal_json_1 = __importDefault(require("../../../../contracts/baseDAO/lambdaDAO/michelson/supported_lambda_types/update_contract_delegate_proposal.json"));
const update_guardian_proposal_json_1 = __importDefault(require("../../../../contracts/baseDAO/lambdaDAO/michelson/supported_lambda_types/update_guardian_proposal.json"));
const configuration_proposal_type_json_1 = __importDefault(require("../../../../contracts/baseDAO/lambdaDAO/michelson/supported_lambda_types/configuration_proposal_type.json"));
const config_1 = require("../../../../config");
var IndexerStatus;
(function (IndexerStatus) {
    IndexerStatus["CREATED"] = "created";
    IndexerStatus["DROPPED"] = "dropped";
    IndexerStatus["EXECUTED"] = "executed";
    IndexerStatus["REJECTED_AND_FLUSHED"] = "rejected_and_flushed";
})(IndexerStatus || (exports.IndexerStatus = IndexerStatus = {}));
var ProposalStatus;
(function (ProposalStatus) {
    ProposalStatus["PENDING"] = "pending";
    ProposalStatus["ACTIVE"] = "active";
    ProposalStatus["PASSED"] = "passed";
    ProposalStatus["REJECTED"] = "rejected";
    ProposalStatus["NO_QUORUM"] = "no quorum";
    ProposalStatus["EXECUTABLE"] = "executable";
    ProposalStatus["DROPPED"] = "dropped";
    ProposalStatus["EXPIRED"] = "expired";
    ProposalStatus["EXECUTED"] = "executed";
})(ProposalStatus || (exports.ProposalStatus = ProposalStatus = {}));
const baseProposalMetadata = {
    config: [],
    update_guardian: "",
    update_contract_delegate: "",
    agoraPostId: "-1"
};
function getBaseMetadata(proposalMetadataDTO) {
    const values = Object.assign({}, baseProposalMetadata);
    if ("execute_handler" in proposalMetadataDTO && proposalMetadataDTO.execute_handler.packed_argument) {
        const parser = new michel_codec_1.Parser();
        const unpacked_argument = (0, michel_codec_1.unpackDataBytes)({ bytes: proposalMetadataDTO.execute_handler.packed_argument }, parser.parseMichelineExpression(proposalMetadataDTO.execute_handler.packed_argument));
        if (proposalMetadataDTO.execute_handler.handler_name === "update_contract_delegate_proposal") {
            const update_contract_delegate_schema = new michelson_encoder_1.Schema(update_contract_delegate_proposal_json_1.default);
            const update_contract_delegate_data = update_contract_delegate_schema.Execute(unpacked_argument);
            values.update_contract_delegate = update_contract_delegate_data.Some;
        }
        if (proposalMetadataDTO.execute_handler.handler_name === "update_guardian_proposal") {
            const update_guardian_schema = new michelson_encoder_1.Schema(update_guardian_proposal_json_1.default);
            const update_guardian_data = update_guardian_schema.Execute(unpacked_argument);
            values.update_guardian = update_guardian_data;
        }
        if (proposalMetadataDTO.execute_handler.handler_name === "configuration_proposal") {
            const configuration_proposal_schema = new michelson_encoder_1.Schema(configuration_proposal_type_json_1.default);
            const configuration_proposal_data = configuration_proposal_schema.Execute(unpacked_argument);
            values.config = Object.entries(configuration_proposal_data)
                .filter(([_, value]) => !!value)
                .map(([key, value]) => ({
                key: key,
                value: value.Some
            }));
        }
    }
    return values;
}
const INDEXER_TO_PROPOSAL_STATUS_MAP = {
    created: ProposalStatus.PENDING,
    rejected_and_flushed: ProposalStatus.DROPPED,
    dropped: ProposalStatus.DROPPED,
    executed: ProposalStatus.EXECUTED
};
class Proposal {
    constructor(dto, dao) {
        this.type = dao.data.type;
        this.id = dto.key;
        this.dao = dao;
        this.votingPeriodNum = Number(dto.voting_stage_num);
        this.voters = dto.votes.map(vote => ({
            address: vote.holder.address,
            value: (0, utils_1.parseUnits)(new bignumber_js_1.default(vote.amount), this.dao.data.token.decimals),
            support: Boolean(vote.support),
            staked: vote.staked
        }));
        this.upVotes = this.voters.reduce((acc, voter) => {
            if (voter.support) {
                return bignumber_js_1.default.sum(acc, voter.value);
            }
            return acc;
        }, new bignumber_js_1.default(0));
        this.downVotes = this.voters.reduce((acc, voter) => {
            if (!voter.support) {
                return bignumber_js_1.default.sum(acc, voter.value);
            }
            return acc;
        }, new bignumber_js_1.default(0));
        this.proposer = dto.holder.address;
        this.startDate = dto.start_date;
        this.startLevel = dto.start_level;
        this.quorumThreshold = (0, utils_1.parseUnits)(new bignumber_js_1.default(dto.quorum_threshold), dao.data.token.decimals);
        this.period = Number(dto.voting_stage_num) - 1;
        this.indexer_status_history = dto.status_updates.map(update => ({
            timestamp: `Block ${update.level} (${(0, dayjs_1.default)(update.timestamp).format("LLL")})`,
            level: update.level,
            description: update.proposal_status.description
        }));
        this.proposerFrozenTokens = dto.proposer_frozen_token;
        this.packedMetadata = dto.metadata;
    }
    getStatus(currentLevel) {
        if (!this.cachedStatus || currentLevel !== this.cachedStatus.level) {
            const activeThreshold = this.votingPeriodNum * Number(this.dao.data.period) + this.dao.data.start_level;
            const passedOrRejectedThreshold = activeThreshold + Number(this.dao.data.period);
            const flushThreshold = this.startLevel + Number(this.dao.data.proposal_flush_level);
            const expiredThreshold = this.startLevel + Number(this.dao.data.proposal_expired_level);
            const statusHistory = this.indexer_status_history.map(update => ({
                timestamp: update.timestamp,
                status: INDEXER_TO_PROPOSAL_STATUS_MAP[update.description],
                level: update.level
            }));
            if (currentLevel >= activeThreshold) {
                statusHistory.push({
                    status: ProposalStatus.ACTIVE,
                    timestamp: `Level ${activeThreshold}`,
                    level: activeThreshold
                });
            }
            if (currentLevel >= passedOrRejectedThreshold) {
                if (this.downVotes.isGreaterThanOrEqualTo(this.quorumThreshold)) {
                    statusHistory.push({
                        status: ProposalStatus.REJECTED,
                        timestamp: `Level ${passedOrRejectedThreshold}`,
                        level: passedOrRejectedThreshold
                    });
                }
                else if (this.upVotes.isGreaterThanOrEqualTo(this.quorumThreshold)) {
                    statusHistory.push({
                        status: ProposalStatus.PASSED,
                        timestamp: `Level ${passedOrRejectedThreshold}`,
                        level: passedOrRejectedThreshold
                    });
                }
                else {
                    statusHistory.push({
                        status: ProposalStatus.NO_QUORUM,
                        timestamp: `Level ${passedOrRejectedThreshold}`,
                        level: passedOrRejectedThreshold
                    });
                }
            }
            if (currentLevel >= flushThreshold && statusHistory.some(s => s.status === ProposalStatus.PASSED)) {
                statusHistory.push({
                    status: ProposalStatus.EXECUTABLE,
                    timestamp: `Level ${this.startLevel + this.dao.data.proposal_flush_level}`,
                    level: flushThreshold
                });
            }
            if (currentLevel >= expiredThreshold) {
                statusHistory.push({
                    status: ProposalStatus.EXPIRED,
                    timestamp: `Level ${this.startLevel + this.dao.data.proposal_expired_level}`,
                    level: expiredThreshold
                });
            }
            const orderedStatusHistory = statusHistory.sort((a, b) => a.level - b.level);
            const finalStatuses = [ProposalStatus.DROPPED, ProposalStatus.EXECUTED];
            const finalStatusIndex = statusHistory.findIndex(a => finalStatuses.includes(a.status));
            const filteredStatusHistory = finalStatusIndex > -1 ? orderedStatusHistory.splice(0, finalStatusIndex + 1) : orderedStatusHistory;
            this.cachedStatus = {
                status: filteredStatusHistory.slice(-1)[0].status,
                statusHistory: filteredStatusHistory,
                level: currentLevel
            };
        }
        return this.cachedStatus;
    }
}
exports.Proposal = Proposal;
class LambdaProposal extends Proposal {
    constructor() {
        super(...arguments);
        this.cachedMetadata = null;
    }
    get metadata() {
        var _a;
        let lambdaMetadata = {
            lambdaType: "",
            lambdaHandler: {},
            config: [],
            transfers: [],
            update_contract_delegate: "",
            update_guardian: "",
            agoraPostId: "",
            list: []
        };
        if (this.cachedMetadata !== null) {
            return this.cachedMetadata;
        }
        const parser = new michel_codec_1.Parser();
        const typ = parser.parseMichelineExpression(proposelambda_1.default);
        const schema = new michelson_encoder_1.Schema(typ);
        const unpackedMetadata = (0, michel_codec_1.unpackDataBytes)({ bytes: this.packedMetadata }, typ);
        const proposalMetadataDTO = schema.Execute(unpackedMetadata);
        const baseMetadata = getBaseMetadata(proposalMetadataDTO);
        lambdaMetadata = Object.assign(Object.assign({}, baseMetadata), { lambdaType: "", lambdaHandler: {}, list: [], transfers: [] });
        if ("add_handler" in proposalMetadataDTO) {
            lambdaMetadata.lambdaType = "add_handler";
            lambdaMetadata.lambdaHandler = proposalMetadataDTO.add_handler;
        }
        if ("remove_handler" in proposalMetadataDTO) {
            lambdaMetadata.lambdaType = "remove_handler";
            lambdaMetadata.lambdaHandler = proposalMetadataDTO.remove_handler;
        }
        if ("execute_handler" in proposalMetadataDTO) {
            lambdaMetadata.lambdaType = "execute_handler";
            lambdaMetadata.lambdaHandler = proposalMetadataDTO.execute_handler;
            try {
                lambdaMetadata.lambdaHandler.unpacked_argument = (0, michel_codec_1.unpackDataBytes)({ bytes: lambdaMetadata.lambdaHandler.packed_argument }, parser.parseMichelineExpression((_a = lambdaMetadata.lambdaHandler) === null || _a === void 0 ? void 0 : _a.packed_argument));
                if (lambdaMetadata.lambdaHandler.handler_name === "transfer_proposal") {
                    const transfer_michelson = this.dao.data.address === config_1.HUMANITEZ_DAO ? transfer_proposal_type_before_fa1_2_json_1.default : transfer_proposal_type_json_1.default;
                    const transfer_arg_schema = new michelson_encoder_1.Schema(transfer_michelson);
                    const transfer_proposal_data = transfer_arg_schema.Execute(lambdaMetadata.lambdaHandler.unpacked_argument);
                    const { agora_post_id, registry_diff, transfers } = transfer_proposal_data;
                    lambdaMetadata.agoraPostId = agora_post_id;
                    if (transfers) {
                        lambdaMetadata.transfers = (0, _1.extractTransfersData)(transfers);
                    }
                    if (registry_diff) {
                        lambdaMetadata.list = registry_diff.map((item) => ({
                            key: (0, tzip16_1.bytes2Char)(item[0]),
                            value: (0, tzip16_1.bytes2Char)(item[1])
                        }));
                    }
                }
            }
            catch (error) {
                lambdaMetadata.lambdaHandler.unpacked_argument = {};
            }
            finally {
                delete lambdaMetadata.lambdaHandler.packed_argument;
            }
        }
        this.cachedMetadata = Object.assign({}, lambdaMetadata);
        return this.cachedMetadata;
    }
}
exports.LambdaProposal = LambdaProposal;
//# sourceMappingURL=types.js.map