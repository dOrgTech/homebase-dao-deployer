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
exports.TZKTSubscriptionsContext = exports.TZKTSubscriptionsProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const signalr_1 = require("@microsoft/signalr");
const useTezos_1 = require("../../beacon/hooks/useTezos");
const index_1 = require("../index");
const TZKTSubscriptionsContext = (0, react_1.createContext)({
    state: {
        block: 0
    }
});
exports.TZKTSubscriptionsContext = TZKTSubscriptionsContext;
const getUrl = (network) => `https://api.${index_1.networkNameMap[network]}.tzkt.io/v1/events`;
const TZKTSubscriptionsProvider = ({ children }) => {
    const [block, setBlock] = (0, react_1.useState)(0);
    const socketRef = (0, react_1.useRef)();
    const { network } = (0, useTezos_1.useTezos)();
    (0, react_1.useEffect)(() => {
        ;
        (() => __awaiter(void 0, void 0, void 0, function* () {
            socketRef.current = new signalr_1.HubConnectionBuilder().withUrl(getUrl(network)).build();
            yield socketRef.current.start();
            // listen for incoming message
            socketRef.current.on("blocks", (blockMessage) => {
                setBlock(blockMessage.state);
            });
            yield socketRef.current.invoke("SubscribeToBlocks");
        }))();
        return () => {
            var _a;
            (_a = socketRef.current) === null || _a === void 0 ? void 0 : _a.stop();
        };
    }, [network]);
    return (0, jsx_runtime_1.jsx)(TZKTSubscriptionsContext.Provider, { value: { state: { block } }, children: children });
};
exports.TZKTSubscriptionsProvider = TZKTSubscriptionsProvider;
//# sourceMappingURL=TZKTSubscriptions.js.map