'use strict';var __awaiter=this&&this.__awaiter||function(thisArg,_arguments,P,generator){function adopt(value){return value instanceof P?value:new P(function(resolve){resolve(value);});}return new(P||(P=Promise))(function(resolve,reject){function fulfilled(value){try{step(generator.next(value));}catch(e){reject(e);}}function rejected(value){try{step(generator['throw'](value));}catch(e){reject(e);}}function step(result){result.done?resolve(result.value):adopt(result.value).then(fulfilled,rejected);}step((generator=generator.apply(thisArg,_arguments||[])).next());});};var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{'default':mod};};Object.defineProperty(exports,'__esModule',{value:true});exports.User=exports.ProposalItem=void 0;const jsx_runtime_1=require('react/jsx-runtime');const core_1=require('@material-ui/core');const dayjs_1=__importDefault(require('dayjs'));const router_1=require('../DAO/router');const react_1=require('react');const react_router_1=require('react-router');const useTopic_1=require('../../../../services/agora/hooks/useTopic');const useTezos_1=require('../../../../services/beacon/hooks/useTezos');const useUnstakeFromAllProposals_1=require('../../../../services/contracts/baseDAO/hooks/useUnstakeFromAllProposals');const utils_1=require('../../../../services/contracts/utils');const useDAO_1=require('../../../../services/services/dao/hooks/useDAO');const useProposals_1=require('../../../../services/services/dao/hooks/useProposals');const types_1=require('../../../../services/services/dao/mappers/proposal/types');const FreezeDialog_1=require('../../components/FreezeDialog');const ProposalsList_1=require('../../components/ProposalsList');const StatusBadge_1=require('../../components/StatusBadge');const ProfileAvatar_1=require('../../components/styled/ProfileAvatar');const UserBalances_1=require('../../components/UserBalances');const UserProfileName_1=require('../../components/UserProfileName');const Proposals_1=require('../Proposals');const usePolls_1=require('../../../lite/explorer/hooks/usePolls');const ContentBlockItem=(0,core_1.styled)(core_1.Grid)({padding:'35px 52px',borderTop:`0.3px solid #4a4e4e`});const BalancesHeader=(0,core_1.styled)(core_1.Grid)(({theme})=>({minHeight:'178px',padding:'46px 55px',background:theme.palette.primary.main,boxSizing:'border-box',borderRadius:8,boxShadow:'none'}));const MainContainer=(0,core_1.styled)(core_1.Box)({width:'100%'});const UsernameText=(0,core_1.styled)(core_1.Typography)({fontSize:18,wordBreak:'break-all'});const ProposalTitle=(0,core_1.styled)(core_1.Typography)({fontWeight:'bold'});const StatusText=(0,core_1.styled)(core_1.Typography)({textTransform:'uppercase',marginLeft:10,fontSize:18,marginRight:30});const VotedText=(0,core_1.styled)(core_1.Typography)({fontSize:18});const CreatedText=(0,core_1.styled)(core_1.Typography)({fontWeight:300});const ProposalItem=({proposal,status,children})=>{const {data:agoraPost}=(0,useTopic_1.useAgoraTopic)(Number(proposal.metadata.agoraPostId));const formattedDate=(0,dayjs_1.default)(proposal.startDate).format('LLL');return(0,jsx_runtime_1.jsxs)(ContentBlockItem,{container:true,justifyContent:'space-between',alignItems:'center',children:[(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,sm:8,children:(0,jsx_runtime_1.jsxs)(core_1.Grid,{container:true,direction:'column',style:{gap:20},children:[(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,children:(0,jsx_runtime_1.jsx)(ProposalTitle,{color:'textPrimary',variant:'body1',children:agoraPost?agoraPost.title:`Proposal ${(0,utils_1.toShortAddress)(proposal.id)}`})}),(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,children:(0,jsx_runtime_1.jsxs)(core_1.Grid,{container:true,style:{gap:20},alignItems:'center',children:[(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,children:(0,jsx_runtime_1.jsx)(StatusBadge_1.StatusBadge,{status:status})}),(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,children:(0,jsx_runtime_1.jsxs)(CreatedText,{variant:'body1',color:'textPrimary',children:['Created ',formattedDate]})})]})})]})}),(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,children:children})]});};exports.ProposalItem=ProposalItem;const User=()=>{var _a;const {account}=(0,useTezos_1.useTezos)();const daoId=(0,router_1.useDAOID)();const {data,cycleInfo}=(0,useDAO_1.useDAO)(daoId);const {data:proposals}=(0,useProposals_1.useProposals)(daoId);const history=(0,react_router_1.useHistory)();const {data:activeProposals}=(0,useProposals_1.useProposals)(daoId,types_1.ProposalStatus.ACTIVE);const {data:executableProposals}=(0,useProposals_1.useProposals)(daoId,types_1.ProposalStatus.EXECUTABLE);const {data:expiredProposals}=(0,useProposals_1.useProposals)(daoId,types_1.ProposalStatus.EXPIRED);const {data:executedProposals}=(0,useProposals_1.useProposals)(daoId,types_1.ProposalStatus.EXECUTED);const {data:droppedProposals}=(0,useProposals_1.useProposals)(daoId,types_1.ProposalStatus.DROPPED);const {mutate:unstakeFromAllProposals}=(0,useUnstakeFromAllProposals_1.useUnstakeFromAllProposals)();const polls=(0,usePolls_1.usePolls)((_a=data===null||data===void 0?void 0:data.liteDAOData)===null||_a===void 0?void 0:_a._id);const pollsPosted=polls===null||polls===void 0?void 0:polls.filter(p=>p.author===account);(0,react_1.useEffect)(()=>{if(!account){history.push(`../${daoId}`);}},[account,daoId,history]);const proposalsCreated=(0,react_1.useMemo)(()=>{if(!proposals){return[];}return proposals.filter(p=>p.proposer.toLowerCase()===account.toLowerCase());},[account,proposals]);const proposalsVoted=(0,react_1.useMemo)(()=>{if(!proposals){return[];}return proposals.filter(p=>p.voters.map(voter=>voter.address.toLowerCase()).includes(account.toLowerCase()));},[account,proposals]);const onUnstakeFromAllProposals=(0,react_1.useCallback)(()=>__awaiter(void 0,void 0,void 0,function*(){if(droppedProposals&&executedProposals&&data){const allProposals=droppedProposals.concat(executedProposals);const proposalsWithStakedTokens=[];allProposals.forEach(proposal=>{const userVote=proposal.voters.find(voter=>voter.address===account);if(userVote&&userVote.staked){proposalsWithStakedTokens.push(proposal);}});unstakeFromAllProposals({dao:data,allProposals:proposalsWithStakedTokens.map(p=>p.id)});return;}}),[data,account,unstakeFromAllProposals,droppedProposals,executedProposals]);const canUnstakeVotes=executedProposals&&droppedProposals&&executedProposals.concat(droppedProposals).some(proposal=>{var _a;return(_a=proposal.voters.find(vote=>vote.address===account))===null||_a===void 0?void 0:_a.staked;});const getVoteDecision=proposal=>{var _a;return(_a=proposal.voters.find(voter=>voter.address.toLowerCase()))===null||_a===void 0?void 0:_a.support;};return(0,jsx_runtime_1.jsx)(MainContainer,{children:(0,jsx_runtime_1.jsxs)(core_1.Grid,{container:true,direction:'column',style:{gap:40},wrap:'nowrap',children:[(0,jsx_runtime_1.jsx)(BalancesHeader,{item:true,children:(0,jsx_runtime_1.jsx)(UserBalances_1.UserBalances,{daoId:daoId,children:(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,children:(0,jsx_runtime_1.jsxs)(core_1.Grid,{container:true,alignItems:'center',justifyContent:'space-between',style:{gap:20},children:[(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,children:(0,jsx_runtime_1.jsxs)(core_1.Grid,{container:true,spacing:2,alignItems:'center',wrap:'nowrap',children:[(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,children:(0,jsx_runtime_1.jsx)(ProfileAvatar_1.ProfileAvatar,{size:43,address:account})}),(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,children:(0,jsx_runtime_1.jsx)(UsernameText,{color:'textPrimary',children:(0,jsx_runtime_1.jsx)(UserProfileName_1.UserProfileName,{address:account})})})]})}),(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,children:(0,jsx_runtime_1.jsxs)(core_1.Grid,{container:true,spacing:2,alignItems:'center',children:[(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,children:(0,jsx_runtime_1.jsx)(FreezeDialog_1.FreezeDialog,{freeze:true})}),(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,children:(0,jsx_runtime_1.jsx)(FreezeDialog_1.FreezeDialog,{freeze:false})}),(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,children:(0,jsx_runtime_1.jsx)(Proposals_1.DropButton,{variant:'contained',color:'secondary',onClick:onUnstakeFromAllProposals,disabled:!canUnstakeVotes,children:'Unstake Votes'})})]})})]})})})}),(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,children:proposalsCreated&&cycleInfo&&(0,jsx_runtime_1.jsx)(ProposalsList_1.ProposalsList,{currentLevel:cycleInfo.currentLevel,proposals:proposalsCreated,title:'Proposals Posted',liteProposals:pollsPosted})}),(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,children:proposalsVoted&&cycleInfo&&(0,jsx_runtime_1.jsx)(ProposalsList_1.ProposalsList,{title:'Voting History',currentLevel:cycleInfo.currentLevel,proposals:proposalsVoted,rightItem:proposal=>{const voteDecision=getVoteDecision(proposal);return(0,jsx_runtime_1.jsxs)(core_1.Grid,{container:true,children:[(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,children:(0,jsx_runtime_1.jsx)(VotedText,{color:'textPrimary',children:'Voted'})}),(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,children:(0,jsx_runtime_1.jsx)(StatusText,{color:voteDecision?'secondary':'error',children:voteDecision?'YES':'NO'})})]});},liteProposals:pollsPosted})})]})});};exports.User=User;