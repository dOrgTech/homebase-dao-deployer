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
exports.TezosProvider = exports.TezosContext = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const mixpanel_browser_1 = __importDefault(require("mixpanel-browser"));
const utils_1 = require("./utils");
const reducer_1 = require("./reducer");
const actions_1 = require("./actions");
exports.TezosContext = (0, react_1.createContext)({
    state: reducer_1.INITIAL_STATE,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    dispatch: () => { }
});
const getSavedState = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const network = (0, utils_1.getTezosNetwork)();
        const tezos = (0, utils_1.createTezos)(network);
        const wallet = (0, utils_1.createWallet)(network);
        const activeAccount = yield wallet.client.getActiveAccount();
        if (!(activeAccount === null || activeAccount === void 0 ? void 0 : activeAccount.address)) {
            throw new Error("No wallet address found");
        }
        tezos.setProvider({ wallet });
        return {
            network,
            tezos,
            wallet,
            account: activeAccount.address
        };
    }
    catch (error) {
        return reducer_1.INITIAL_STATE;
    }
});
const TezosProvider = ({ children }) => {
    const [state, dispatch] = (0, react_1.useReducer)(reducer_1.reducer, reducer_1.INITIAL_STATE);
    (0, react_1.useEffect)(() => {
        mixpanel_browser_1.default.register({ Network: state.network });
    }, [state.network]);
    (0, react_1.useEffect)(() => {
        getSavedState().then(tezosState => {
            dispatch({
                type: actions_1.TezosActionType.UPDATE_TEZOS,
                payload: tezosState
            });
        });
    }, []);
    return (0, jsx_runtime_1.jsx)(exports.TezosContext.Provider, { value: { state, dispatch }, children: children });
};
exports.TezosProvider = TezosProvider;
//# sourceMappingURL=context.js.map