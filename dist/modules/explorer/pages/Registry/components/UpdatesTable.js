'use strict';var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{'default':mod};};Object.defineProperty(exports,'__esModule',{value:true});exports.UpdatesTable=void 0;const jsx_runtime_1=require('react/jsx-runtime');const core_1=require('@material-ui/core');const dayjs_1=__importDefault(require('dayjs'));const OverflowCell_1=require('./OverflowCell');const useTopic_1=require('../../../../../services/agora/hooks/useTopic');const utils_1=require('../../../../../services/contracts/utils');const ContentContainer_1=require('../../../components/ContentContainer');const localizedFormat=require('dayjs/plugin/localizedFormat');dayjs_1.default.extend(localizedFormat);const titles=['Update History','Proposal Title','Last Updated','Proposal'];const MobileTableHeader=(0,core_1.styled)(core_1.Grid)({width:'100%',padding:20,borderBottom:'0.3px solid #3D3D3D'});const MobileTableRow=(0,core_1.styled)(core_1.Grid)({padding:'30px',borderBottom:'0.3px solid #3D3D3D'});const ProposalTitle=({agoraPostId,proposalId})=>{const {data:agoraPost}=(0,useTopic_1.useAgoraTopic)(agoraPostId);return(0,jsx_runtime_1.jsx)(jsx_runtime_1.Fragment,{children:agoraPost?agoraPost.title:`Proposal ${(0,utils_1.toShortAddress)(proposalId)}`});};const TableContainer=(0,core_1.styled)(ContentContainer_1.ContentContainer)({width:'100%'});const MobileUpdatesTable=({data})=>{return(0,jsx_runtime_1.jsxs)(core_1.Grid,{container:true,direction:'column',alignItems:'center',children:[(0,jsx_runtime_1.jsx)(MobileTableHeader,{item:true,children:(0,jsx_runtime_1.jsx)(core_1.Typography,{align:'center',variant:'h4',color:'textPrimary',children:'Update History'})}),data.map((row,i)=>(0,jsx_runtime_1.jsxs)(MobileTableRow,{item:true,container:true,direction:'column',alignItems:'center',style:{gap:19},children:[(0,jsx_runtime_1.jsxs)(core_1.Grid,{item:true,children:[(0,jsx_runtime_1.jsx)(core_1.Typography,{variant:'h6',color:'secondary',align:'center',children:'Proposal Key'}),(0,jsx_runtime_1.jsx)(core_1.Typography,{variant:'h6',color:'textPrimary',align:'center',children:row.key})]}),(0,jsx_runtime_1.jsxs)(core_1.Grid,{item:true,children:[(0,jsx_runtime_1.jsx)(core_1.Typography,{variant:'h6',color:'secondary',align:'center',children:'Proposal Title'}),(0,jsx_runtime_1.jsx)(core_1.Typography,{variant:'h6',color:'textPrimary',align:'center',children:(0,jsx_runtime_1.jsx)(ProposalTitle,{proposalId:row.proposalId,agoraPostId:row.agoraPostId})})]}),(0,jsx_runtime_1.jsxs)(core_1.Grid,{item:true,children:[(0,jsx_runtime_1.jsx)(core_1.Typography,{variant:'h6',color:'secondary',align:'center',children:'Last Updated'}),(0,jsx_runtime_1.jsx)(core_1.Typography,{variant:'h6',color:'textPrimary',align:'center',children:row.lastUpdated})]}),(0,jsx_runtime_1.jsxs)(core_1.Grid,{item:true,children:[(0,jsx_runtime_1.jsx)(core_1.Typography,{variant:'h6',color:'secondary',align:'center',children:'Proposal'}),(0,jsx_runtime_1.jsx)(core_1.Typography,{variant:'h6',color:'textPrimary',align:'center',children:row.agoraPostId})]})]},`usersMobile-${i}`))]});};const DesktopUpdatesTable=({data})=>{return(0,jsx_runtime_1.jsx)(jsx_runtime_1.Fragment,{children:(0,jsx_runtime_1.jsxs)(core_1.Table,{children:[(0,jsx_runtime_1.jsx)(core_1.TableHead,{children:(0,jsx_runtime_1.jsx)(core_1.TableRow,{children:titles.map((title,i)=>(0,jsx_runtime_1.jsx)(core_1.TableCell,{children:title},`updatestitle-${i}`))})}),(0,jsx_runtime_1.jsx)(core_1.TableBody,{children:data.map((row,i)=>(0,jsx_runtime_1.jsxs)(core_1.TableRow,{children:[(0,jsx_runtime_1.jsx)(OverflowCell_1.OverflowCell,{children:row.key.toUpperCase()}),(0,jsx_runtime_1.jsx)(OverflowCell_1.OverflowCell,{children:(0,jsx_runtime_1.jsx)(ProposalTitle,{proposalId:row.proposalId,agoraPostId:row.agoraPostId})}),(0,jsx_runtime_1.jsx)(core_1.TableCell,{children:(0,dayjs_1.default)(row.lastUpdated).format('L')}),(0,jsx_runtime_1.jsx)(OverflowCell_1.OverflowCell,{children:row.proposalId})]},`updatesrow-${i}`))})]})});};const UpdatesTable=({data})=>{const theme=(0,core_1.useTheme)();const isSmall=(0,core_1.useMediaQuery)(theme.breakpoints.down('sm'));return(0,jsx_runtime_1.jsx)(TableContainer,{item:true,children:isSmall?(0,jsx_runtime_1.jsx)(MobileUpdatesTable,{data:data}):(0,jsx_runtime_1.jsx)(DesktopUpdatesTable,{data:data})});};exports.UpdatesTable=UpdatesTable;