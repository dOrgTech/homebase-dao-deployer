'use strict';var __rest=this&&this.__rest||function(s,e){var t={};for(var p in s)if(Object.prototype.hasOwnProperty.call(s,p)&&e.indexOf(p)<0)t[p]=s[p];if(s!=null&&typeof Object.getOwnPropertySymbols==='function')for(var i=0,p=Object.getOwnPropertySymbols(s);i<p.length;i++){if(e.indexOf(p[i])<0&&Object.prototype.propertyIsEnumerable.call(s,p[i]))t[p[i]]=s[p[i]];}return t;};Object.defineProperty(exports,'__esModule',{value:true});exports.useNotification=void 0;const jsx_runtime_1=require('react/jsx-runtime');const react_1=require('react');const core_1=require('@material-ui/core');const notistack_1=require('notistack');const icons_1=require('@material-ui/icons');const ExternalLink_1=require('../ExternalLink');const CloseIcon=(0,core_1.styled)(icons_1.Close)({color:'#fff'});const ExpandIcon=(0,core_1.styled)(icons_1.OpenInNew)({color:'#fff',fontSize:25});const NotificationActions=({detailsLink,onClose})=>(0,jsx_runtime_1.jsxs)(react_1.Fragment,{children:[detailsLink?(0,jsx_runtime_1.jsx)(ExternalLink_1.ExternalLink,{link:detailsLink,children:(0,jsx_runtime_1.jsx)(ExpandIcon,{})}):null,(0,jsx_runtime_1.jsx)(core_1.Button,{onClick:onClose,children:(0,jsx_runtime_1.jsx)(CloseIcon,{})})]});const useNotification=()=>{const {enqueueSnackbar,closeSnackbar}=(0,notistack_1.useSnackbar)();const open=_a=>{var {message,detailsLink}=_a,options=__rest(_a,['message','detailsLink']);const key=enqueueSnackbar(message,Object.assign(Object.assign({},options),{persist:true,action:(0,jsx_runtime_1.jsx)(NotificationActions,{detailsLink:detailsLink,onClose:()=>closeSnackbar(key)})}));return{key,closeSnackbar};};return open;};exports.useNotification=useNotification;