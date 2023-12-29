"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storageParamsToBaseDAODockerArgs = void 0;
const utils_1 = require("../contracts/utils");
const tzip16_1 = require("@taquito/tzip16");
const bignumber_js_1 = require("bignumber.js");
const storageParamsToBaseDAODockerArgs = (storage, metadata, token, currentLevel) => ({
    admin_address: storage.adminAddress,
    guardian_address: storage.guardian,
    governance_token_address: `"${storage.governanceToken.address}"`,
    governance_token_id: `"${storage.governanceToken.tokenId}n"`,
    max_proposal_size: `2500n`,
    slash_division_value: `100n`,
    slash_scale_value: `${storage.extra.slashScaleValue.toFixed()}n`,
    frozen_extra_value: `${(0, utils_1.formatUnits)(storage.extra.frozenExtraValue, token.decimals).toFixed()}n`,
    frozen_scale_value: "0n",
    metadata_map: formatMetadata(metadata),
    quorum_threshold: `${storage.quorumThreshold.toFixed()}n`,
    min_quorum: `${storage.minQuorumAmount}n`,
    max_quorum: `${storage.maxQuorumAmount}n`,
    quorum_change: `${storage.quorumChange}n`,
    max_quorum_change: `${storage.quorumMaxChange}n`,
    proposal_flush_level: `${storage.proposalFlushPeriod}n`,
    proposal_expired_level: `${storage.proposalExpiryPeriod}n`,
    governance_total_supply: `${token.supply.toFixed()}n`,
    period: `${storage.votingPeriod}n`,
    start_level: `${currentLevel}n`,
    min_xtz_amount: `${(0, utils_1.xtzToMutez)(new bignumber_js_1.BigNumber(storage.extra.minXtzAmount)).toFixed()}mutez`,
    max_xtz_amount: `${(0, utils_1.xtzToMutez)(new bignumber_js_1.BigNumber(storage.extra.maxXtzAmount)).toFixed()}mutez`
});
exports.storageParamsToBaseDAODockerArgs = storageParamsToBaseDAODockerArgs;
const formatMetadata = ({ deployAddress, keyName }) => {
    return `'(Big_map.literal [
    ("", 0x${(0, tzip16_1.char2Bytes)(`tezos-storage://${deployAddress}/${keyName}`)});
  ])'`;
};
//# sourceMappingURL=mappers.js.map