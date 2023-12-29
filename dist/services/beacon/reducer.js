"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reducer = exports.INITIAL_STATE = void 0;
const utils_1 = require("./utils");
const actions_1 = require("./actions");
const network = (0, utils_1.getTezosNetwork)();
const tezos = (0, utils_1.createTezos)(network);
exports.INITIAL_STATE = {
    tezos,
    network,
    wallet: undefined,
    // @TODO: refactor interface this is actually an address
    account: ""
};
const reducer = (state, action) => {
    switch (action.type) {
        case actions_1.TezosActionType.UPDATE_TEZOS:
            return Object.assign(Object.assign({}, state), { tezos: action.payload.tezos, network: action.payload.network, account: action.payload.account, wallet: action.payload.wallet });
        case actions_1.TezosActionType.RESET_TEZOS:
            return Object.assign(Object.assign({}, state), { tezos: tezos, account: "", wallet: undefined });
    }
};
exports.reducer = reducer;
//# sourceMappingURL=reducer.js.map