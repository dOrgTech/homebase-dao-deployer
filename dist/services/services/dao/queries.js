'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.GET_XTZ_TRANSFERS=exports.GET_PROPOSAL_QUERY=exports.GET_PROPOSALS_QUERY=exports.GET_DAO_QUERY=exports.GET_DAOS_QUERY_V2=exports.GET_DAOS_QUERY=void 0;const graphql_request_1=require('graphql-request');exports.GET_DAOS_QUERY=(0,graphql_request_1.gql)`
  query getDaos($network: String!) {
    daos(where: { network: { _eq: $network } }) {
      dao_type {
        name
      }
      description
      address
      frozen_token_id
      governance_token_id
      ledgers {
        holder {
          address
        }
      }
      name
      network
      period
      staked
      start_level
      token {
        contract
        decimals
        is_transferable
        level
        name
        network
        should_prefer_symbol
        supply
        symbol
        timestamp
        token_id
      }
    }
  }
`;exports.GET_DAOS_QUERY_V2=(0,graphql_request_1.gql)`
  query getDaos($network: String!) {
    daos(where: { network: { _eq: $network } }) {
      dao_type {
        name
      }
      description
      address
      frozen_token_id
      governance_token_id
      ledgers {
        holder {
          address
        }
      }
      name
      network
      period
      staked
      start_level
      token {
        contract
        decimals
        is_transferable
        level
        name
        network
        should_prefer_symbol
        supply
        symbol
        timestamp
        token_id
      }
    }
  }
`;exports.GET_DAO_QUERY=(0,graphql_request_1.gql)`
  query getDao($address: String!) {
    daos(where: { address: { _eq: $address } }) {
      dao_type {
        id
        name
      }
      description
      address
      frozen_token_id
      governance_token_id
      guardian
      id
      last_updated_cycle
      ledgers {
        id
        holder {
          id
          address
          proposals_aggregate {
            aggregate {
              count
            }
          }
          votes_aggregate {
            aggregate {
              sum {
                amount
              }
            }
          }
        }
        current_stage_num
        current_unstaked
        past_unstaked
        staked
      }
      # max_proposals
      max_quorum_change
      max_quorum_threshold
      min_quorum_threshold
      name
      network
      period
      proposal_expired_level
      proposal_flush_level
      quorum_change
      fixed_proposal_fee_in_token
      quorum_threshold
      staked
      start_level
      lambda_extras {
        id
        frozen_extra_value
        frozen_scale_value
        max_xtz_amount
        min_xtz_amount
        registry
        registry_affected
        slash_division_value
        slash_scale_value
      }
      token {
        id
        contract
        decimals
        is_transferable
        level
        name
        network
        should_prefer_symbol
        supply
        symbol
        timestamp
        token_id
      }
    }
  }
`;exports.GET_PROPOSALS_QUERY=(0,graphql_request_1.gql)`
  query getDao($address: String!) {
    daos(where: { address: { _eq: $address } }) {
      proposals {
        downvotes
        hash
        id
        key
        metadata
        proposer_frozen_token
        proposer_id
        quorum_threshold
        start_level
        start_date
        upvotes
        voting_stage_num
        holder {
          address
          id
        }
        status_updates(order_by: { timestamp: asc }) {
          timestamp
          id
          level
          proposal_status {
            id
            description
          }
        }
        votes {
          amount
          holder {
            address
            id
          }
          id
          support
          staked
        }
      }
    }
  }
`;exports.GET_PROPOSAL_QUERY=(0,graphql_request_1.gql)`
  query getDao($address: String!, $proposalKey: String!) {
    daos(where: { _and: { address: { _eq: $address } } }) {
      proposals(where: { key: { _eq: $proposalKey } }) {
        downvotes
        hash
        id
        key
        metadata
        proposer_frozen_token
        proposer_id
        quorum_threshold
        start_level
        start_date
        upvotes
        voting_stage_num
        holder {
          address
          id
        }
        status_updates(order_by: { timestamp: asc }) {
          timestamp
          id
          level
          proposal_status {
            id
            description
          }
        }
        votes {
          amount
          holder {
            address
            id
          }
          id
          support
          staked
        }
      }
    }
  }
`;exports.GET_XTZ_TRANSFERS=(0,graphql_request_1.gql)`
  query getTransfers($address: String!) {
    transfer(where: { dao: { address: { _eq: $address } } }) {
      decimal_amount
      amount
      from_address
      timestamp
      hash
    }
  }
`;