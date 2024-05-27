'use strict';var __rest=this&&this.__rest||function(s,e){var t={};for(var p in s)if(Object.prototype.hasOwnProperty.call(s,p)&&e.indexOf(p)<0)t[p]=s[p];if(s!=null&&typeof Object.getOwnPropertySymbols==='function')for(var i=0,p=Object.getOwnPropertySymbols(s);i<p.length;i++){if(e.indexOf(p[i])<0&&Object.prototype.propertyIsEnumerable.call(s,p[i]))t[p[i]]=s[p[i]];}return t;};var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{'default':mod};};Object.defineProperty(exports,'__esModule',{value:true});exports.TransferBadge=void 0;const jsx_runtime_1=require('react/jsx-runtime');const core_1=require('@material-ui/core');const ArrowForward_1=__importDefault(require('@material-ui/icons/ArrowForward'));const HighlightedBadge_1=require('./styled/HighlightedBadge');const UserBadge_1=require('./UserBadge');const useTokenMetadata_1=require('../../../services/contracts/baseDAO/hooks/useTokenMetadata');const utils_1=require('../../../services/contracts/utils');const FA2Symbol_1=require('./FA2Symbol');const ArrowContainer=(0,core_1.styled)(core_1.Grid)(({theme})=>({color:theme.palette.text.primary}));const TransferBadge=_a=>{var {address,amount,contract,tokenId}=_a,props=__rest(_a,['address','amount','contract','tokenId']);const {data}=(0,useTokenMetadata_1.useTokenMetadata)(contract,tokenId);return(0,jsx_runtime_1.jsxs)(HighlightedBadge_1.HighlightedBadge,Object.assign({justifyContent:'center',alignItems:'center',direction:'row',container:true,style:{gap:20}},props,{children:[(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,children:data&&(0,jsx_runtime_1.jsxs)(core_1.Typography,{variant:'body1',color:'textPrimary',children:[(0,utils_1.parseUnits)(amount,data.decimals).toString(),' ',(0,jsx_runtime_1.jsx)(FA2Symbol_1.FA2Symbol,{contractAddress:contract,tokenId:tokenId})]})}),(0,jsx_runtime_1.jsx)(ArrowContainer,{item:true,children:(0,jsx_runtime_1.jsx)(ArrowForward_1.default,{color:'inherit'})}),(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,children:(0,jsx_runtime_1.jsx)(UserBadge_1.UserBadge,{address:address})})]}));};exports.TransferBadge=TransferBadge;