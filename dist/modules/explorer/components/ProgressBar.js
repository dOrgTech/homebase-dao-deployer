'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.MultiColorBar=exports.ProgressBar=void 0;const core_1=require('@material-ui/core');exports.ProgressBar=(0,core_1.styled)(core_1.LinearProgress)(({theme,favor})=>({'marginTop':10,'&.MuiLinearProgress-colorSecondary, &.MuiLinearProgress-colorPrimary':{'background':theme.palette.primary.light,'color':theme.palette.primary.light,'& .MuiLinearProgress-bar':{backgroundColor:`${favor?theme.palette.secondary.main:theme.palette.error.main} !important`}}}));exports.MultiColorBar=(0,core_1.styled)(core_1.LinearProgress)(({theme})=>({'marginTop':10,'&.MuiLinearProgress-colorSecondary, &.MuiLinearProgress-colorPrimary':{'background':theme.palette.error.main,'color':theme.palette.error.main,'& .MuiLinearProgress-bar':{backgroundColor:`theme.palette.secondary.main !important`}}}));