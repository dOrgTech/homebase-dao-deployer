"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseLambdaCode = exports.roundNumber = void 0;
const roundNumber = ({ number, decimals }) => Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
exports.roundNumber = roundNumber;
const parseLambdaCode = (lambdaCode) => {
    if (!lambdaCode) {
        return "";
    }
    const code = JSON.stringify({
        code: JSON.parse(lambdaCode.code),
        handler_check: JSON.parse(lambdaCode.handler_check),
        is_active: lambdaCode.is_active
    }, null, 2);
    return code;
};
exports.parseLambdaCode = parseLambdaCode;
//# sourceMappingURL=utils.js.map