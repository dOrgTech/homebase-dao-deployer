"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFeatureFlag = void 0;
const launchdarkly_react_client_sdk_1 = require("launchdarkly-react-client-sdk");
const useFeatureFlag = (featureFlag) => {
    var _a;
    const flags = (0, launchdarkly_react_client_sdk_1.useFlags)();
    return (_a = flags[featureFlag]) !== null && _a !== void 0 ? _a : false;
};
exports.useFeatureFlag = useFeatureFlag;
//# sourceMappingURL=featureFlags.js.map