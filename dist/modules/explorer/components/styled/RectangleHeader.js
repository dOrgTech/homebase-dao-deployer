'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.RectangleContainer=void 0;const core_1=require('@material-ui/core');exports.RectangleContainer=(0,core_1.styled)(core_1.Grid)(({theme})=>({minHeight:125,padding:'68px 8%',borderBottom:`2px solid ${theme.palette.primary.light}`,[theme.breakpoints.down('sm')]:{padding:'35px 8%'}}));