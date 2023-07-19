'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.ProposalActionsDialog=void 0;const jsx_runtime_1=require('react/jsx-runtime');const core_1=require('@material-ui/core');const react_1=require('react');const router_1=require('../pages/DAO/router');const ConfigProposalForm_1=require('./ConfigProposalForm');const ResponsiveDialog_1=require('./ResponsiveDialog');const GuardianChangeProposalForm_1=require('./GuardianChangeProposalForm');const DelegationChangeProposalForm_1=require('./DelegationChangeProposalForm');const lambdas_1=require('../../../services/bakingBad/lambdas');const ConfigProposalFormLambda_1=require('./ConfigProposalFormLambda');const useDAO_1=require('../../../services/services/dao/hooks/useDAO');const ProposalCreatorModal_1=require('../../lite/explorer/pages/CreateProposal/ProposalCreatorModal');const OptionContainer=(0,core_1.styled)(core_1.Grid)(({theme})=>({'minHeight':80,'background':theme.palette.primary.main,'borderRadius':8,'padding':'35px 42px','marginBottom':16,'cursor':'pointer','height':110,'&:hover':{background:theme.palette.secondary.dark,scale:1.01,transition:'0.15s ease-in'}}));const ActionText=(0,core_1.styled)(core_1.Typography)(({theme})=>({fontWeight:400,fontSize:20,marginBottom:8}));const ActionDescriptionText=(0,core_1.styled)(core_1.Typography)(({theme})=>({fontWeight:300,fontSize:16}));const getActions=()=>[{name:'Add Lambda',description:'Write Michelson code to add Lambda',id:ConfigProposalFormLambda_1.ProposalAction.new,isLambda:true},{name:'Remove Lambda',description:'Choose which Lambda to remove',id:ConfigProposalFormLambda_1.ProposalAction.remove,isLambda:true},{name:'Execute Lambda',description:'Execute a Lambda already installed on DAO',id:ConfigProposalFormLambda_1.ProposalAction.execute,isLambda:true},{name:'DAO Configuration',description:'Change proposal fee and returned token amount',id:lambdas_1.SupportedLambdaProposalKey.ConfigurationProposal,isLambda:false},{name:'Change Guardian',description:'Change the DAO Guardian Address',id:lambdas_1.SupportedLambdaProposalKey.UpdateGuardianProposal,isLambda:false},{name:'Change Delegate',description:'Change the DAO Delegate Address',id:lambdas_1.SupportedLambdaProposalKey.UpdateContractDelegateProposal,isLambda:false},{name:'Off Chain Poll',description:'Create an inconsequential poll for your community',id:'off-chain',isLambda:true}];const defaultOpenSupportedExecuteProposalModal='none';const ProposalActionsDialog=({open,handleClose})=>{var _a;const daoId=(0,router_1.useDAOID)();const {data}=(0,useDAO_1.useDAO)(daoId);const theme=(0,core_1.useTheme)();const isMobileSmall=(0,core_1.useMediaQuery)(theme.breakpoints.down('sm'));const [proposalAction,setProposalAction]=(0,react_1.useState)(ConfigProposalFormLambda_1.ProposalAction.none);const [openProposalFormLambda,setOpenProposalFormLambda]=(0,react_1.useState)(false);const [openLiteProposal,setOpenLiteProposal]=(0,react_1.useState)(false);const liteDAOId=(_a=data===null||data===void 0?void 0:data.liteDAOData)===null||_a===void 0?void 0:_a._id;const handleOpenCustomProposalModal=key=>{setProposalAction(key);setOpenProposalFormLambda(true);handleClose();};const handleCloseCustomProposalModal=()=>{setProposalAction(ConfigProposalFormLambda_1.ProposalAction.none);setOpenProposalFormLambda(false);handleClose();};const handleOpenSupportedExecuteProposalModal=lambdaKey=>{setOpenSupportedExecuteProposalModal(lambdaKey);handleClose();};const handleCloseSupportedExecuteProposalModal=()=>{setOpenLiteProposal(false);setOpenSupportedExecuteProposalModal(defaultOpenSupportedExecuteProposalModal);handleClose();};const handleLiteProposal=()=>{setOpenLiteProposal(true);handleClose();};const [openSupportedExecuteProposalModalKey,setOpenSupportedExecuteProposalModal]=(0,react_1.useState)(defaultOpenSupportedExecuteProposalModal);return(0,jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment,{children:[(0,jsx_runtime_1.jsx)(ResponsiveDialog_1.ResponsiveDialog,{open:open,onClose:handleClose,title:'New Proposal',template:'xs',children:(0,jsx_runtime_1.jsx)(core_1.Grid,{container:true,style:{marginTop:32},spacing:2,children:getActions().map((elem,index)=>!liteDAOId&&elem.id==='off-chain'?null:(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,xs:isMobileSmall?12:4,children:(0,jsx_runtime_1.jsxs)(OptionContainer,{onClick:()=>elem.id==='off-chain'?handleLiteProposal():elem.isLambda?handleOpenCustomProposalModal(elem.id):handleOpenSupportedExecuteProposalModal(elem.id),children:[(0,jsx_runtime_1.jsx)(ActionText,{color:'textPrimary',children:elem.name}),(0,jsx_runtime_1.jsxs)(ActionDescriptionText,{color:'textPrimary',children:[' ',elem.description,' ']})]})},index))})}),(0,jsx_runtime_1.jsx)(ConfigProposalFormLambda_1.ProposalFormLambda,{action:proposalAction,open:openProposalFormLambda,handleClose:handleCloseCustomProposalModal}),(0,jsx_runtime_1.jsx)(ConfigProposalForm_1.ConfigProposalForm,{open:openSupportedExecuteProposalModalKey===lambdas_1.SupportedLambdaProposalKey.ConfigurationProposal,handleClose:handleCloseSupportedExecuteProposalModal}),(0,jsx_runtime_1.jsx)(GuardianChangeProposalForm_1.GuardianChangeProposalForm,{open:openSupportedExecuteProposalModalKey===lambdas_1.SupportedLambdaProposalKey.UpdateGuardianProposal,handleClose:handleCloseSupportedExecuteProposalModal}),(0,jsx_runtime_1.jsx)(DelegationChangeProposalForm_1.DelegationChangeProposalForm,{open:openSupportedExecuteProposalModalKey===lambdas_1.SupportedLambdaProposalKey.UpdateContractDelegateProposal,handleClose:handleCloseSupportedExecuteProposalModal}),(0,jsx_runtime_1.jsx)(ProposalCreatorModal_1.ProposalCreatorModal,{open:openLiteProposal,handleClose:handleCloseSupportedExecuteProposalModal})]});};exports.ProposalActionsDialog=ProposalActionsDialog;