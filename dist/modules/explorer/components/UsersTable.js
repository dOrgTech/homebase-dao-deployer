'use strict';var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{'default':mod};};Object.defineProperty(exports,'__esModule',{value:true});exports.UsersTable=void 0;const jsx_runtime_1=require('react/jsx-runtime');const core_1=require('@material-ui/core');const dayjs_1=__importDefault(require('dayjs'));const UserBadge_1=require('./UserBadge');const localizedFormat=require('dayjs/plugin/localizedFormat');dayjs_1.default.extend(localizedFormat);const titles=['Rank','Votes','Available Staked','Total Staked','Proposals Voted'];const OverflowCell=(0,core_1.styled)(core_1.TableCell)({whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',maxWidth:300});const StyledTableHead=(0,core_1.styled)(core_1.TableHead)({minHeight:34});const StyledTableRow=(0,core_1.styled)(core_1.TableRow)({borderBottom:'.6px solid rgba(125,140,139, 0.2)'});const MobileTableRow=(0,core_1.styled)(core_1.Grid)({padding:'30px',borderBottom:'0.3px solid rgba(125,140,139, 0.2)'});const TableText=(0,core_1.styled)(core_1.Typography)({fontSize:'16px',fontWeight:500,['@media (max-width:1155px)']:{fontSize:'15px',whiteSpace:'nowrap'}});const titleDataMatcher=(title,rowData)=>{switch(title){case'Rank':return rowData.address;case'Votes':return rowData.votes;case'Available Staked':return rowData.availableStaked;case'Total Staked':return rowData.totalStaked;case'Proposals Voted':return rowData.proposalsVoted;}};const MobileTableHeader=(0,core_1.styled)(core_1.Grid)({width:'100%',padding:20,borderBottom:'0.3px solid rgba(125,140,139, 0.2)'});const MobileUsersTable=({data})=>{return(0,jsx_runtime_1.jsxs)(core_1.Grid,{container:true,direction:'column',alignItems:'center',children:[(0,jsx_runtime_1.jsx)(MobileTableHeader,{item:true,children:(0,jsx_runtime_1.jsx)(core_1.Typography,{align:'center',variant:'h4',color:'textPrimary',children:'Top Addresses'})}),data.map((row,i)=>(0,jsx_runtime_1.jsx)(MobileTableRow,{item:true,container:true,direction:'column',alignItems:'center',style:{gap:19},children:titles.map((title,j)=>(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,children:title==='Rank'?(0,jsx_runtime_1.jsx)(UserBadge_1.UserBadge,{address:row.address,size:44,gap:10}):(0,jsx_runtime_1.jsxs)(core_1.Typography,{variant:'h6',color:'textPrimary',children:[title,': ',titleDataMatcher(title,row)]})},`usersMobileItem-${j}`))},`usersMobile-${i}`))]});};const DesktopUsersTable=({data})=>{return(0,jsx_runtime_1.jsx)(jsx_runtime_1.Fragment,{children:(0,jsx_runtime_1.jsxs)(core_1.Table,{children:[(0,jsx_runtime_1.jsxs)(StyledTableHead,{children:[(0,jsx_runtime_1.jsx)(StyledTableRow,{children:(0,jsx_runtime_1.jsx)(core_1.TableCell,{children:(0,jsx_runtime_1.jsx)(TableText,{children:'Top Addresses'})})}),(0,jsx_runtime_1.jsx)(core_1.TableRow,{children:titles.map((title,i)=>(0,jsx_runtime_1.jsx)(core_1.TableCell,{children:(0,jsx_runtime_1.jsx)(TableText,{children:title})},`userstitle-${i}`))})]}),(0,jsx_runtime_1.jsx)(core_1.TableBody,{children:data.map((row,i)=>(0,jsx_runtime_1.jsxs)(core_1.TableRow,{children:[(0,jsx_runtime_1.jsx)(OverflowCell,{children:(0,jsx_runtime_1.jsx)(UserBadge_1.UserBadge,{smallText:true,address:row.address,size:44,gap:16})}),(0,jsx_runtime_1.jsx)(core_1.TableCell,{children:row.votes}),(0,jsx_runtime_1.jsx)(core_1.TableCell,{children:row.availableStaked}),(0,jsx_runtime_1.jsx)(core_1.TableCell,{children:row.totalStaked}),(0,jsx_runtime_1.jsx)(core_1.TableCell,{children:row.proposalsVoted})]},`usersrow-${i}`))})]})});};const UsersTable=({data})=>{const theme=(0,core_1.useTheme)();const isExtraSmall=(0,core_1.useMediaQuery)(theme.breakpoints.down(960));return isExtraSmall?(0,jsx_runtime_1.jsx)(MobileUsersTable,{data:data}):(0,jsx_runtime_1.jsx)(DesktopUsersTable,{data:data});};exports.UsersTable=UsersTable;