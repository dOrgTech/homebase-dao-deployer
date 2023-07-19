'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.WarningDialog=void 0;const jsx_runtime_1=require('react/jsx-runtime');const react_1=require('react');const core_1=require('@material-ui/core');const ProposalFormSendButton_1=require('./ProposalFormSendButton');const ResponsiveDialog_1=require('./ResponsiveDialog');const CustomDialog=(0,core_1.styled)(ResponsiveDialog_1.ResponsiveDialog)({'& .MuiDialog-paperWidthSm':{minHeight:'300px !important'}});const TableHeader=(0,core_1.styled)(core_1.Grid)({padding:'25px 64px'});const Footer=(0,core_1.styled)(core_1.Grid)({padding:'15px 64px'});const WarningDialog=({open,handleClose})=>{const [checked,setChecked]=(0,react_1.useState)(false);return(0,jsx_runtime_1.jsxs)(CustomDialog,{open:open,onClose:handleClose,title:'DISCLAIMER',children:[(0,jsx_runtime_1.jsx)(TableHeader,{container:true,direction:'row',alignItems:'center',children:(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,xs:12,children:(0,jsx_runtime_1.jsxs)(core_1.Typography,{variant:'h4',color:'textSecondary',children:['Homebase is currently experimental and its underlying smart contracts remain in testing.',(0,jsx_runtime_1.jsx)('br',{}),(0,jsx_runtime_1.jsx)('br',{}),'Expect breaking changes in coming releases. For more on Homebase, read',' ',(0,jsx_runtime_1.jsx)(core_1.Link,{href:'https://github.com/dOrgTech/homebase-app',rel:'noreferrer noopener',target:'_blank',color:'secondary',children:'here'})]})})}),(0,jsx_runtime_1.jsx)(Footer,{children:(0,jsx_runtime_1.jsx)(core_1.FormControlLabel,{color:'secondary',control:(0,jsx_runtime_1.jsx)(core_1.Checkbox,{checked:checked,onChange:event=>setChecked(event.target.checked),name:'checkedA'}),label:'I understand'})}),(0,jsx_runtime_1.jsx)(ProposalFormSendButton_1.SendButton,{disabled:!checked,onClick:handleClose,children:'CONFIRM'})]});};exports.WarningDialog=WarningDialog;