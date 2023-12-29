'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.DaoSettingModal=void 0;const jsx_runtime_1=require('react/jsx-runtime');const core_1=require('@material-ui/core');const ResponsiveDialog_1=require('../../../components/ResponsiveDialog');const DAOInfoTable_1=require('../../Config/components/DAOInfoTable');const OptionContainer=(0,core_1.styled)(core_1.Grid)(({theme})=>({'minHeight':80,'background':theme.palette.primary.main,'borderRadius':8,'padding':'35px 42px','marginBottom':16,'cursor':'pointer','height':110,'&:hover':{background:theme.palette.secondary.dark,scale:1.01,transition:'0.15s ease-in'}}));const ActionText=(0,core_1.styled)(core_1.Typography)(({theme})=>({fontWeight:400,fontSize:20,marginBottom:8}));const ActionDescriptionText=(0,core_1.styled)(core_1.Typography)(({theme})=>({fontWeight:300,fontSize:16}));const DaoSettingModal=({open,handleClose})=>{const theme=(0,core_1.useTheme)();const isMobileSmall=(0,core_1.useMediaQuery)(theme.breakpoints.down('sm'));return(0,jsx_runtime_1.jsx)(jsx_runtime_1.Fragment,{children:(0,jsx_runtime_1.jsx)(ResponsiveDialog_1.ResponsiveDialog,{open:open,onClose:handleClose,title:'Dao Settings',template:'xs',children:(0,jsx_runtime_1.jsx)(DAOInfoTable_1.DaoInfoTables,{})})});};exports.DaoSettingModal=DaoSettingModal;