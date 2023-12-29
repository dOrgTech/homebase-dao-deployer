'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.SuspenseDots=void 0;const jsx_runtime_1=require('react/jsx-runtime');const core_1=require('@material-ui/core');const useStyles=(0,core_1.makeStyles)({'firstDot':{animation:'$firstDot 2s linear infinite'},'secondDot':{animation:'$secondDot 2s linear infinite'},'threeDot':{animation:'$thirdDot 2s linear infinite'},'@keyframes firstDot':{'0%':{opacity:1},'65%':{opacity:1},'66%':{opacity:0},'100%':{opacity:0}},'@keyframes secondDot':{'0%':{opacity:0},'21%':{opacity:0},'22%':{opacity:1},'65%':{opacity:1},'66%':{opacity:0},'100%':{opacity:0}},'@keyframes thirdDot':{'0%':{opacity:0},'43%':{opacity:0},'44%':{opacity:1},'65%':{opacity:1},'66%':{opacity:0},'100%':{opacity:0}}});const SuspenseDots=()=>{const classes=useStyles();return(0,jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment,{children:[(0,jsx_runtime_1.jsx)('span',{className:classes.firstDot,children:'.'}),(0,jsx_runtime_1.jsx)('span',{className:classes.secondDot,children:'.'}),(0,jsx_runtime_1.jsx)('span',{className:classes.threeDot,children:'.'})]});};exports.SuspenseDots=SuspenseDots;