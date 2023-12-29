'use strict';var __createBinding=this&&this.__createBinding||(Object.create?function(o,m,k,k2){if(k2===undefined)k2=k;var desc=Object.getOwnPropertyDescriptor(m,k);if(!desc||('get'in desc?!m.__esModule:desc.writable||desc.configurable)){desc={enumerable:true,get:function(){return m[k];}};}Object.defineProperty(o,k2,desc);}:function(o,m,k,k2){if(k2===undefined)k2=k;o[k2]=m[k];});var __setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(o,v){Object.defineProperty(o,'default',{enumerable:true,value:v});}:function(o,v){o['default']=v;});var __importStar=this&&this.__importStar||function(mod){if(mod&&mod.__esModule)return mod;var result={};if(mod!=null)for(var k in mod)if(k!=='default'&&Object.prototype.hasOwnProperty.call(mod,k))__createBinding(result,mod,k);__setModuleDefault(result,mod);return result;};Object.defineProperty(exports,'__esModule',{value:true});exports.VotesDetailDialog=void 0;const jsx_runtime_1=require('react/jsx-runtime');const react_1=__importStar(require('react'));const core_1=require('@material-ui/core');const ResponsiveDialog_1=require('./ResponsiveDialog');const useVotesStats_1=require('../hooks/useVotesStats');const bignumber_js_1=require('bignumber.js');const useProposal_1=require('../../../services/services/dao/hooks/useProposal');const VotesTable_1=require('./VotesTable');const utils_1=require('../../../utils');const VotersProgress_1=require('./VotersProgress');const StyledTab=(0,core_1.styled)(core_1.Button)({fontSize:16});var SelectedVotes;(function(SelectedVotes){SelectedVotes[SelectedVotes['ALL']=0]='ALL';SelectedVotes[SelectedVotes['SUPPORT']=1]='SUPPORT';SelectedVotes[SelectedVotes['OPPOSE']=2]='OPPOSE';}(SelectedVotes||(SelectedVotes={})));const VotesDetailDialog=({open,onClose,daoAddress,proposalAddress})=>{const [selectedTab,setSelectedTab]=react_1.default.useState(SelectedVotes.ALL);const handleChangeTab=newValue=>{setSelectedTab(newValue);};const {data:proposal}=(0,useProposal_1.useProposal)(daoAddress,proposalAddress);const quorumThreshold=(proposal===null||proposal===void 0?void 0:proposal.quorumThreshold)||new bignumber_js_1.BigNumber(0);const votesData=proposal===null||proposal===void 0?void 0:proposal.voters;const {votesSum}=(0,useVotesStats_1.useVotesStats)({quorumThreshold,upVotes:(proposal===null||proposal===void 0?void 0:proposal.upVotes)||new bignumber_js_1.BigNumber(0),downVotes:(proposal===null||proposal===void 0?void 0:proposal.downVotes)||new bignumber_js_1.BigNumber(0)});const {supportVotes,againstVotes,allVotes}=(0,react_1.useMemo)(()=>{if(!votesData){return{supportVotes:[],againstVotes:[],allVotes:[]};}const allVotes=votesData.map(voter=>({address:voter.address,votes:(0,utils_1.roundNumber)({number:Number(voter.value.toString()),decimals:2}).toString(),support:voter.support}));const supportVotes=allVotes.filter(voter=>voter.support);const againstVotes=allVotes.filter(voter=>!voter.support);return{allVotes,supportVotes,againstVotes};},[votesData]);const votesToShow=selectedTab==SelectedVotes.ALL?allVotes:selectedTab==SelectedVotes.SUPPORT?supportVotes:againstVotes;return(0,jsx_runtime_1.jsx)(ResponsiveDialog_1.ResponsiveDialog,{open:open,onClose:onClose,title:'Votes',children:(0,jsx_runtime_1.jsxs)(core_1.Grid,{container:true,direction:'column',style:{gap:58},children:[(0,jsx_runtime_1.jsxs)(core_1.Grid,{item:true,container:true,direction:'column',style:{gap:16},children:[(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,children:(0,jsx_runtime_1.jsx)(core_1.Typography,{variant:'h2',color:'textPrimary',style:{fontWeight:'bold'},children:votesSum.toString()})}),(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,children:(0,jsx_runtime_1.jsx)(VotersProgress_1.VotersProgress,{wrapAll:true,showButton:false,daoId:daoAddress,proposalId:proposalAddress})})]}),(0,jsx_runtime_1.jsxs)(core_1.Grid,{item:true,container:true,direction:'column',style:{gap:40},children:[(0,jsx_runtime_1.jsxs)(core_1.Grid,{item:true,container:true,children:[(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,children:(0,jsx_runtime_1.jsx)(StyledTab,{variant:'contained',color:selectedTab!==SelectedVotes.ALL?'primary':'secondary',disableRipple:true,disableElevation:true,onClick:()=>handleChangeTab(SelectedVotes.ALL),children:'All'})}),(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,children:(0,jsx_runtime_1.jsx)(StyledTab,{disableRipple:true,disableElevation:true,variant:'contained',color:selectedTab!==SelectedVotes.SUPPORT?'primary':'secondary',onClick:()=>handleChangeTab(SelectedVotes.SUPPORT),children:'Support'})}),(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,children:(0,jsx_runtime_1.jsx)(StyledTab,{disableRipple:true,disableElevation:true,variant:'contained',color:selectedTab!==SelectedVotes.OPPOSE?'primary':'secondary',onClick:()=>handleChangeTab(SelectedVotes.OPPOSE),children:'Oppose'})})]}),(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,children:(0,jsx_runtime_1.jsx)(VotesTable_1.VotesTable,{data:votesToShow})})]})]})});};exports.VotesDetailDialog=VotesDetailDialog;