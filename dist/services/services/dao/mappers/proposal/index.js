"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapTransfersArgs = exports.extractTransfersData = void 0;
const utils_1 = require("../../../../contracts/utils");
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const extractTransfersData = (transfersDTO) => {
    const transfers = transfersDTO.map((transfer) => {
        if (transfer.hasOwnProperty("xtz_transfer_type")) {
            const xtzTransfer = transfer;
            return {
                amount: xtzTransfer.xtz_transfer_type.amount,
                beneficiary: xtzTransfer.xtz_transfer_type.recipient,
                type: "XTZ"
            };
        }
        else if (transfer.hasOwnProperty("token_transfer_type")) {
            const fa2Transfer = transfer;
            return {
                amount: fa2Transfer.token_transfer_type.transfer_list[0].txs[0].amount,
                beneficiary: fa2Transfer.token_transfer_type.transfer_list[0].txs[0].to_,
                contractAddress: fa2Transfer.token_transfer_type.contract_address,
                tokenId: fa2Transfer.token_transfer_type.transfer_list[0].txs[0].token_id,
                type: "FA2"
            };
        }
        else {
            const fa12Transfer = transfer;
            return {
                amount: fa12Transfer.legacy_token_transfer_type.transfer.target.value,
                beneficiary: fa12Transfer.legacy_token_transfer_type.transfer.target.to,
                contractAddress: fa12Transfer.legacy_token_transfer_type.contract_address,
                type: "FA1.2",
                tokenId: "0"
            };
        }
    });
    return transfers;
};
exports.extractTransfersData = extractTransfersData;
const mapXTZTransfersArgs = (transfer) => {
    return {
        xtz_transfer_type: {
            amount: (0, utils_1.xtzToMutez)(new bignumber_js_1.default(transfer.amount)).toNumber(),
            recipient: transfer.recipient
        }
    };
};
const mapFA2TransfersArgs = (transfer, daoAddress) => {
    return {
        token_transfer_type: {
            contract_address: transfer.asset.contract,
            transfer_list: [
                {
                    from_: daoAddress,
                    txs: [
                        {
                            to_: transfer.recipient,
                            token_id: transfer.asset.token_id,
                            amount: (0, utils_1.formatUnits)(new bignumber_js_1.default(transfer.amount), transfer.asset.decimals).toNumber()
                        }
                    ]
                }
            ]
        }
    };
};
const mapFA12TransfersArgs = (transfer, daoAddress) => {
    return {
        legacy_token_transfer_type: {
            contract_address: transfer.asset.contract,
            transfer: {
                from: daoAddress,
                target: {
                    to: transfer.recipient,
                    value: (0, utils_1.formatUnits)(new bignumber_js_1.default(transfer.amount), transfer.asset.decimals).toNumber()
                }
            }
        }
    };
};
const mapTransfersArgs = (transfers, daoAddress) => {
    return transfers.map(transfer => {
        if (transfer.type === "FA2") {
            return mapFA2TransfersArgs(transfer, daoAddress);
        }
        if (transfer.type === "FA1.2") {
            return mapFA12TransfersArgs(transfer, daoAddress);
        }
        return mapXTZTransfersArgs(transfer);
    });
};
exports.mapTransfersArgs = mapTransfersArgs;
//# sourceMappingURL=index.js.map