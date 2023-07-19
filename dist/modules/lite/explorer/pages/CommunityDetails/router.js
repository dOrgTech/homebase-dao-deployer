'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.CommunityDetailsRouter=void 0;const jsx_runtime_1=require('react/jsx-runtime');const react_router_1=require('react-router');const index_1=require('./index');const CreateProposal_1=require('../CreateProposal');const ProposalDetails_1=require('../ProposalDetails');const CommunityDetailsRouter=({id})=>{const match=(0,react_router_1.useRouteMatch)();return(0,jsx_runtime_1.jsxs)(react_router_1.Switch,{children:[(0,jsx_runtime_1.jsx)(react_router_1.Route,{exact:true,path:`${match.url}`,children:(0,jsx_runtime_1.jsx)(index_1.CommunityDetails,{id:id})}),(0,jsx_runtime_1.jsx)(react_router_1.Route,{exact:true,path:`${match.url}/proposal`,children:(0,jsx_runtime_1.jsx)(CreateProposal_1.ProposalCreator,{id:id})}),(0,jsx_runtime_1.jsx)(react_router_1.Route,{exact:true,path:`${match.url}/proposal/:proposalId`,children:(0,jsx_runtime_1.jsx)(ProposalDetails_1.ProposalDetails,{id:id})}),(0,jsx_runtime_1.jsx)(react_router_1.Redirect,{to:`${match.url}`})]});};exports.CommunityDetailsRouter=CommunityDetailsRouter;