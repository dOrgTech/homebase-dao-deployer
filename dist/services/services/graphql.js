"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client_v2 = exports.client = void 0;
const graphql_request_1 = require("graphql-request");
const config_1 = require("../config");
const BASE_URL = (0, config_1.getEnv)(config_1.EnvKey.REACT_APP_HASURA_URL);
const BASE_URL_V2 = (0, config_1.getEnv)(config_1.EnvKey.REACT_APP_HASURA_URL_V2);
const HASURA_ADMIN_SECRET = (0, config_1.getEnv)(config_1.EnvKey.REACT_APP_HASURA_ADMIN_SECRET);
const HASURA_ADMIN_SECRET_V2 = (0, config_1.getEnv)(config_1.EnvKey.REACT_APP_HASURA_ADMIN_SECRET_V2);
if (!BASE_URL) {
    throw new Error(`${config_1.EnvKey.REACT_APP_HASURA_URL} env variable is missing`);
}
if (!HASURA_ADMIN_SECRET) {
    throw new Error(`${config_1.EnvKey.REACT_APP_HASURA_ADMIN_SECRET} env variable is missing`);
}
exports.client = new graphql_request_1.GraphQLClient(BASE_URL, {
    headers: {
        "content-type": "application/json",
        "x-hasura-admin-secret": HASURA_ADMIN_SECRET
    }
});
exports.client_v2 = new graphql_request_1.GraphQLClient(BASE_URL_V2, {
    headers: {
        "content-type": "application/json",
        "x-hasura-admin-secret": HASURA_ADMIN_SECRET_V2
    }
});
//# sourceMappingURL=graphql.js.map