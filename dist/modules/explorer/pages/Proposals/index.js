'use strict';var __awaiter=this&&this.__awaiter||function(thisArg,_arguments,P,generator){function adopt(value){return value instanceof P?value:new P(function(resolve){resolve(value);});}return new(P||(P=Promise))(function(resolve,reject){function fulfilled(value){try{step(generator.next(value));}catch(e){reject(e);}}function rejected(value){try{step(generator['throw'](value));}catch(e){reject(e);}}function step(result){result.done?resolve(result.value):adopt(result.value).then(fulfilled,rejected);}step((generator=generator.apply(thisArg,_arguments||[])).next());});};var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{'default':mod};};Object.defineProperty(exports,'__esModule',{value:true});exports.Proposals=exports.DropButton=void 0;const jsx_runtime_1=require('react/jsx-runtime');const react_1=require('react');const core_1=require('@material-ui/core');const useDAO_1=require('../../../../services/services/dao/hooks/useDAO');const useProposals_1=require('../../../../services/services/dao/hooks/useProposals');const router_1=require('../DAO/router');const types_1=require('../../../../services/services/dao/mappers/proposal/types');const ContentContainer_1=require('../../components/ContentContainer');const AllProposalsList_1=require('../../components/AllProposalsList');const SmallButton_1=require('../../../common/SmallButton');const ProposalActionsDialog_1=require('../../components/ProposalActionsDialog');const useFlush_1=require('../../../../services/contracts/baseDAO/hooks/useFlush');const useDropAllExpired_1=require('../../../../services/contracts/baseDAO/hooks/useDropAllExpired');const InfoIcon_1=require('../../components/styled/InfoIcon');const react_customizable_progressbar_1=__importDefault(require('react-customizable-progressbar'));const useTimeLeftInCycle_1=require('../../hooks/useTimeLeftInCycle');const list_icon_svg_1=require('../../../../assets/img/list-icon.svg');const tezos_icon_svg_1=require('../../../../assets/img/tezos-icon.svg');const cycle_icon_svg_1=require('../../../../assets/img/cycle-icon.svg');const chart_icon_svg_1=require('../../../../assets/img/chart-icon.svg');const useCycleInfo_1=require('../../../../services/contracts/baseDAO/hooks/useCycleInfo');const ProposalList_1=require('../../../lite/explorer/components/ProposalList');const usePolls_1=require('../../../lite/explorer/hooks/usePolls');const dayjs_1=__importDefault(require('dayjs'));const ProposalInfoTitle=(0,core_1.styled)(core_1.Typography)({fontSize:'18px',fontWeight:300,['@media (max-width:1155px)']:{whiteSpace:'nowrap'},['@media (max-width:1030px)']:{fontSize:'16.3px',whiteSpace:'initial'},['@media (max-width:830.99px)']:{fontSize:'18px'},['@media (max-width:409.99px)']:{fontSize:'16px'}});const CycleTime=(0,core_1.styled)(core_1.Typography)(({theme})=>({fontWeight:300,fontSize:'18px',['@media (max-width:1030px)']:{fontSize:'16px'},['@media (max-width:830.99px)']:{fontSize:'20px'},['@media (max-width:434px)']:{fontSize:'18px'},['@media (max-width:409.99px)']:{fontSize:'15px'}}));const LargeNumber=(0,core_1.styled)(core_1.Typography)(({theme})=>({fontSize:'36px',fontWeight:300,color:theme.palette.text.primary,marginTop:'7px',['@media (max-width:1030px)']:{fontSize:'30px'}}));const ProgressContainer=(0,core_1.styled)(core_1.Box)({marginLeft:'-18px',marginBottom:'-5px',width:80});const HeroContainer=(0,core_1.styled)(ContentContainer_1.ContentContainer)(({theme})=>({padding:'38px 48px 38px 48px',display:'inline-flex',alignItems:'center',[theme.breakpoints.down('xs')]:{maxHeight:'fit-content'}}));const IconContainer=(0,core_1.styled)(core_1.SvgIcon)({width:'auto',height:45,marginLeft:48});const TitleText=(0,core_1.styled)(core_1.Typography)({fontSize:30,fontWeight:500,lineHeight:0.9,['@media (max-width:1030px)']:{fontSize:25}});exports.DropButton=(0,core_1.styled)(core_1.Button)({verticalAlign:'text-bottom',fontSize:'16px'});const SubtitleText=(0,core_1.styled)(core_1.Grid)({marginTop:40,marginBottom:-12});const ItemBox=(0,core_1.styled)(core_1.Grid)(({theme})=>({gap:24,alignItems:'center',marginBottom:16,[theme.breakpoints.down('sm')]:{justifyContent:'center',height:150,textAlign:'center'}}));const styles=(0,core_1.makeStyles)(theme=>({circleWidth:{'& .RCP':{width:'50px !important'},'& svg':{width:'60px !important',[theme.breakpoints.down('sm')]:{marginTop:-26}}},progressText:{[theme.breakpoints.down('sm')]:{marginTop:-40}}}));const Proposals=()=>{var _a,_b;const daoId=(0,router_1.useDAOID)();const {data,cycleInfo}=(0,useDAO_1.useDAO)(daoId);const blocksLeft=cycleInfo&&cycleInfo.blocksLeft;const {data:proposals}=(0,useProposals_1.useProposals)(daoId);const {data:activeProposals}=(0,useProposals_1.useProposals)(daoId,types_1.ProposalStatus.ACTIVE);const theme=(0,core_1.useTheme)();const isMobileSmall=(0,core_1.useMediaQuery)(theme.breakpoints.down('xs'));const [openDialog,setOpenDialog]=(0,react_1.useState)(false);const {mutate}=(0,useFlush_1.useFlush)();const {mutate:dropAllExpired}=(0,useDropAllExpired_1.useDropAllExpired)();const {data:executableProposals}=(0,useProposals_1.useProposals)(daoId,types_1.ProposalStatus.EXECUTABLE);const {data:expiredProposals}=(0,useProposals_1.useProposals)(daoId,types_1.ProposalStatus.EXPIRED);const {hours,minutes,days}=(0,useTimeLeftInCycle_1.useTimeLeftInCycle)();const style=styles();const shouldDisable=(0,useCycleInfo_1.useIsProposalButtonDisabled)(daoId);const handleCloseModal=()=>{setOpenDialog(false);};(0,react_1.useEffect)(()=>{console.log('se actualizó');},[openDialog]);const onFlush=(0,react_1.useCallback)(()=>__awaiter(void 0,void 0,void 0,function*(){if(executableProposals&&expiredProposals&&executableProposals.length&&data){mutate({dao:data,numOfProposalsToFlush:executableProposals.length,expiredProposalIds:expiredProposals.map(p=>p.id)});return;}}),[data,mutate,executableProposals,expiredProposals]);const onDropAllExpired=(0,react_1.useCallback)(()=>__awaiter(void 0,void 0,void 0,function*(){if(expiredProposals&&expiredProposals.length&&data){dropAllExpired({dao:data,expiredProposalIds:expiredProposals.map(p=>p.id)});return;}}),[data,dropAllExpired,expiredProposals]);const polls=(0,usePolls_1.usePolls)((_a=data===null||data===void 0?void 0:data.liteDAOData)===null||_a===void 0?void 0:_a._id);const id=(_b=data===null||data===void 0?void 0:data.liteDAOData)===null||_b===void 0?void 0:_b._id;const activeLiteProposals=polls===null||polls===void 0?void 0:polls.filter(p=>Number(p.endTime)>(0,dayjs_1.default)().valueOf());return(0,jsx_runtime_1.jsx)(jsx_runtime_1.Fragment,{children:(0,jsx_runtime_1.jsxs)(core_1.Grid,{container:true,direction:'column',style:{gap:42},children:[(0,jsx_runtime_1.jsx)(HeroContainer,{item:true,children:(0,jsx_runtime_1.jsx)(core_1.Grid,{container:true,justifyContent:'space-between',alignItems:'center',children:(0,jsx_runtime_1.jsxs)(core_1.Grid,{item:true,container:true,direction:'row',children:[(0,jsx_runtime_1.jsxs)(core_1.Grid,{container:true,style:{gap:20},alignItems:isMobileSmall?'baseline':'center',direction:isMobileSmall?'column':'row',children:[(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,xs:isMobileSmall?undefined:5,children:(0,jsx_runtime_1.jsx)(TitleText,{color:'textPrimary',children:'Proposals'})}),(0,jsx_runtime_1.jsxs)(core_1.Grid,{item:true,container:true,justifyContent:'flex-end',style:{gap:15},direction:isMobileSmall?'column':'row',xs:isMobileSmall?undefined:true,children:[(0,jsx_runtime_1.jsx)(SmallButton_1.SmallButton,{variant:'contained',disabled:shouldDisable,color:'secondary',onClick:()=>setOpenDialog(true),children:'New Proposal'}),(0,jsx_runtime_1.jsxs)(core_1.Grid,{children:[(0,jsx_runtime_1.jsx)(SmallButton_1.SmallButton,{variant:'contained',color:'secondary',onClick:onFlush,disabled:!executableProposals||!executableProposals.length,children:'Execute'}),(0,jsx_runtime_1.jsx)(core_1.Tooltip,{placement:'bottom',title:'Execute all passed proposals and drop all expired or rejected',children:(0,jsx_runtime_1.jsx)(InfoIcon_1.InfoIcon,{style:{height:16},color:'secondary'})})]}),(0,jsx_runtime_1.jsxs)(core_1.Grid,{children:[(0,jsx_runtime_1.jsx)(exports.DropButton,{variant:'contained',color:'secondary',onClick:onDropAllExpired,disabled:!expiredProposals||!expiredProposals.length,children:'Drop Expired'}),(0,jsx_runtime_1.jsx)(core_1.Tooltip,{placement:'bottom',title:'Drop all expired proposals',children:(0,jsx_runtime_1.jsx)(InfoIcon_1.InfoIcon,{style:{height:16},color:'secondary'})})]})]})]}),(0,jsx_runtime_1.jsxs)(core_1.Grid,{item:true,container:true,direction:'row',alignItems:'center',style:{marginTop:40},spacing:isMobileSmall?2:1,children:[(0,jsx_runtime_1.jsxs)(ItemBox,{item:true,container:true,xs:isMobileSmall?6:4,children:[(0,jsx_runtime_1.jsx)(list_icon_svg_1.ReactComponent,{}),(0,jsx_runtime_1.jsxs)(core_1.Grid,{item:true,children:[(0,jsx_runtime_1.jsx)(ProposalInfoTitle,{color:'textPrimary',children:'Cycle Status'}),(0,jsx_runtime_1.jsxs)(CycleTime,{color:'secondary',children:[shouldDisable?'Voting':'Creating',' ']})]})]}),(0,jsx_runtime_1.jsxs)(ItemBox,{item:true,container:true,xs:isMobileSmall?6:4,children:[(0,jsx_runtime_1.jsx)(cycle_icon_svg_1.ReactComponent,{}),(0,jsx_runtime_1.jsxs)(core_1.Grid,{item:true,children:[(0,jsx_runtime_1.jsx)(ProposalInfoTitle,{color:'textPrimary',children:'Current Cycle'}),(0,jsx_runtime_1.jsx)(CycleTime,{color:'secondary',children:cycleInfo===null||cycleInfo===void 0?void 0:cycleInfo.currentCycle})]})]}),(0,jsx_runtime_1.jsxs)(ItemBox,{item:true,container:true,xs:isMobileSmall?6:4,className:style.circleWidth,children:[(0,jsx_runtime_1.jsx)(react_customizable_progressbar_1.default,{progress:data?(blocksLeft||0)/Number(data.data.period)*100:100,radius:25,strokeWidth:3,strokeColor:theme.palette.secondary.main,trackStrokeWidth:5,trackStrokeColor:'rgba(125,140,139, 0.2)'}),(0,jsx_runtime_1.jsxs)(core_1.Grid,{item:true,className:style.progressText,children:[(0,jsx_runtime_1.jsx)(ProposalInfoTitle,{color:'textPrimary',children:'Time Left in Cycle'}),(0,jsx_runtime_1.jsxs)(CycleTime,{color:'secondary',children:[' ',days,'d ',hours,'h ',minutes,'m',' ']})]})]}),(0,jsx_runtime_1.jsxs)(ItemBox,{item:true,container:true,xs:isMobileSmall?6:4,children:[(0,jsx_runtime_1.jsx)(tezos_icon_svg_1.ReactComponent,{}),(0,jsx_runtime_1.jsxs)(core_1.Grid,{item:true,children:[(0,jsx_runtime_1.jsx)(ProposalInfoTitle,{color:'textPrimary',children:'Voting Addresses'}),(0,jsx_runtime_1.jsx)(CycleTime,{color:'secondary',children:(data===null||data===void 0?void 0:data.data.ledger.length)||'-'})]})]}),(0,jsx_runtime_1.jsxs)(ItemBox,{item:true,container:true,xs:isMobileSmall?6:4,children:[(0,jsx_runtime_1.jsx)(chart_icon_svg_1.ReactComponent,{}),(0,jsx_runtime_1.jsxs)(core_1.Grid,{item:true,children:[(0,jsx_runtime_1.jsx)(ProposalInfoTitle,{color:'textPrimary',children:'Active Proposals'}),(0,jsx_runtime_1.jsxs)(CycleTime,{color:'secondary',children:[' ',Number(activeLiteProposals===null||activeLiteProposals===void 0?void 0:activeLiteProposals.length)+Number(activeProposals===null||activeProposals===void 0?void 0:activeProposals.length)]})]})]})]})]})})}),data&&cycleInfo&&proposals&&(0,jsx_runtime_1.jsx)(AllProposalsList_1.AllProposalsList,{title:'On-Chain',currentLevel:cycleInfo.currentLevel,proposals:proposals}),(0,jsx_runtime_1.jsx)(ProposalActionsDialog_1.ProposalActionsDialog,{open:openDialog,handleClose:handleCloseModal}),polls.length>0?(0,jsx_runtime_1.jsx)(ProposalList_1.ProposalList,{polls:polls,id:id}):null,(proposals===null||proposals===void 0?void 0:proposals.length)===0&&(polls===null||polls===void 0?void 0:polls.length)===0?(0,jsx_runtime_1.jsx)(core_1.Typography,{style:{width:'inherit'},color:'textPrimary',children:'0 proposals found'}):null]})});};exports.Proposals=Proposals;