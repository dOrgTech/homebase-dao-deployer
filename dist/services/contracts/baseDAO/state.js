"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionTypes = exports.StepperIndex = exports.Token = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
class Token {
    constructor(params) {
        this.id = params.id;
        this.contract = params.contract;
        this.token_id = params.token_id;
        this.symbol = params.symbol;
        this.name = params.name;
        this.decimals = params.decimals;
        this.network = params.network;
        this.supply = new bignumber_js_1.default(params.supply);
        this.standard = params.standard ? params.standard : "";
    }
}
exports.Token = Token;
var StepperIndex;
(function (StepperIndex) {
    StepperIndex[StepperIndex["SELECT_TEMPLATE"] = 0] = "SELECT_TEMPLATE";
    StepperIndex[StepperIndex["CONFIGURE_TEMPLATE"] = 1] = "CONFIGURE_TEMPLATE";
    StepperIndex[StepperIndex["REVIEW_INFORMATION"] = 2] = "REVIEW_INFORMATION";
    StepperIndex[StepperIndex["LAUNCH_ORGANIZATION"] = 3] = "LAUNCH_ORGANIZATION";
})(StepperIndex || (exports.StepperIndex = StepperIndex = {}));
function updateNavigationBar(props) {
    return Object.assign({ type: ActionTypes.UPDATE_NAVIGATION_BAR }, props);
}
function updateOrgSettings(org) {
    return {
        type: ActionTypes.UPDATE_ORGANIZATION_SETTINGS,
        org
    };
}
function updateVotingSettings(voting) {
    return {
        type: ActionTypes.UPDATE_VOTING_SETTINGS,
        voting
    };
}
function updateTemplate(template) {
    return {
        type: ActionTypes.UPDATE_TEMPLATE,
        template
    };
}
function updateQuorumSettings(quorum) {
    return {
        type: ActionTypes.UPDATE_QUORUM_SETTINGS,
        quorum
    };
}
function updateDeploymentStatus({ deploying, contract }) {
    return {
        type: ActionTypes.UPDATE_DEPLOYMENT_STATUS,
        status: { deploying, contract }
    };
}
function clearCache() {
    return {
        type: ActionTypes.CLEAR_CACHE
    };
}
var ActionTypes;
(function (ActionTypes) {
    ActionTypes["UPDATE_NAVIGATION_BAR"] = "UPDATE_NAVIGATION_BAR";
    ActionTypes["UPDATE_VOTING_SETTINGS"] = "UPDATE_VOTING_SETTINGS";
    ActionTypes["UPDATE_TEMPLATE"] = "UPDATE_TEMPLATE";
    ActionTypes["UPDATE_QUORUM_SETTINGS"] = "UPDATE_QUORUM_SETTINGS";
    ActionTypes["UPDATE_ORGANIZATION_SETTINGS"] = "UPDATE_ORGANIZATION_SETTINGS";
    ActionTypes["UPDATE_DEPLOYMENT_STATUS"] = "UPDATE_DEPLOYMENT_STATUS";
    ActionTypes["CLEAR_CACHE"] = "CLEAR_CACHE";
})(ActionTypes || (exports.ActionTypes = ActionTypes = {}));
//# sourceMappingURL=state.js.map